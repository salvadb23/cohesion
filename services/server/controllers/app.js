// controller/app.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const apicalypse = require('apicalypse').default;
const steamWrapper = require('steam-wrapper');

const Steam = steamWrapper();
const IGDB = () => apicalypse({
  baseURL: 'https://api-v3.igdb.com',
  headers: {
    Accept: 'application/json',
    'user-key': process.env.IGDB_API_KEY,
  },
  responseType: 'json',
});

// Apicalypse resolves with the res object, use as Promise resolve callback
const extrResData = res => res.data;

// Meant to behave like https://lodash.com/docs#zipObject
const zipObject = (props, values) => props.reduce((prev, cur, i) => (
  { ...prev, [cur]: values[i] }
), {});

const router = express.Router();

// Gets player info and game libraries.
router.get('/players', asyncHandler(async (req, res) => {
  let { steamIds: ids } = req.query;

  if (typeof ids === 'string' || ids instanceof String) {
    ids = ids.split(',');
  }

  let [libraries, profiles] = await Promise.all([
    Promise.all(ids.map(id => Steam.GetOwnedGames(id))),
    Steam.GetPlayerSummaries(...ids),
  ]);

  libraries = libraries.reduce((prev, games, i) => (
    { ...prev, [ids[i]]: games }
  ), {});

  profiles = Object.keys(profiles).reduce((prev, id) => (
    { ...prev, [id]: { ...profiles[id], games: libraries[id] } }
  ), {});

  res.json(profiles);
}));

// Gets game details
router.get('/games', asyncHandler(async (req, res) => {
  let { appIds: ids } = req.query;

  if (typeof ids === 'string' || ids instanceof String) {
    ids = ids.split(',');
  }

  // IGDB free tier limited to 10, circumevents issue
  const batchSize = 10;
  const batches = [];
  for (let i = 0; i < ids.length; i += batchSize) {
    batches.push(ids.slice(i, i + batchSize));
  }

  let gamesInfo = await Promise.all(batches.map((batch) => {
    // IGDB free tier doesn't include external_games field
    const urls = batch.map(id => `https://store.steampowered.com/app/${id}`);

    return IGDB()
      .fields([
        'name',
        'cover.image_id',
        'websites.url',
        'themes',
        'genres',
        'player_perspectives',
        'platforms',
        'game_modes',
      ])
      .limit(batchSize)
      .where(`websites.url=("${urls.join('","')}")`)
      .request('/games')
      .then(extrResData);
  }));

  // ES2019 feature - Node v11.12+
  gamesInfo = gamesInfo.flat();

  // Highly likely that not every game is on IGDB with its Steam URL, need to extract ids from urls
  const resultIds = gamesInfo.map((info) => {
    const { url } = info.websites.filter(site => site.url.startsWith('https://store.steampowered.com/app/'))[0];
    return url.split('/').slice(-1)[0];
  });

  // Those that aren't found should default to null for client use.
  const defaults = ids.reduce((prev, id) => (
    { ...prev, [id]: null }
  ), {});

  res.json({ ...defaults, ...zipObject(resultIds, gamesInfo) });
}));

// Index IGDB results by id for easier use in client
const indexArrById = arr => arr.reduce((prev, cur) => {
  const { id, ...item } = cur;
  return { ...prev, [id]: item };
}, {});

// For mapping id results from /details to names
router.get('/glossaries', asyncHandler(async (req, res) => {
  const [themes, genres, playerPerspectives, platforms] = await Promise.all([
    IGDB()
      .fields('name')
      .request('/themes')
      .then(extrResData)
      .then(indexArrById),
    IGDB()
      .fields('name')
      .request('/genres')
      .then(extrResData)
      .then(indexArrById),
    IGDB()
      .fields('name')
      .request('/player_perspectives')
      .then(extrResData)
      .then(indexArrById),
    IGDB()
      .fields('name')
      .where('id=(3,6,14)')
      .request('/platforms')
      .then(extrResData)
      .then(indexArrById),
    IGDB()
      .fields('name')
      .request('/game_modes')
      .then(extrResData)
      .then(indexArrById),
  ]);

  res.json({
    themes,
    genres,
    playerPerspectives,
    platforms,
  });
}));

module.exports = router;
