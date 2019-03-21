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

const extrResData = res => res.data;

// Meant to behave like https://lodash.com/docs#zipObject
const zipObject = (props, values) => props.reduce((prev, cur, i) => (
  { ...prev, [cur]: values[i] }
), {});

const router = express.Router();

router.get('/player', asyncHandler(async (req, res) => {
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

router.get('/info', asyncHandler(async (req, res) => {
  let { appIds: ids } = req.query;

  if (typeof ids === 'string' || ids instanceof String) {
    ids = ids.split(',');
  }

  const batchSize = 10;
  const batches = [];
  for (let i = 0; i < ids.length; i += batchSize) {
    batches.push(ids.slice(i, i + batchSize));
  }

  let gamesInfo = await Promise.all(batches.map((batch) => {
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

  gamesInfo = gamesInfo.flat();

  const resultIds = gamesInfo.map((info) => {
    const { url } = info.websites.filter(site => site.url.startsWith('https://store.steampowered.com/app/'))[0];
    return url.split('/').slice(-1)[0];
  });

  const defaults = ids.reduce((prev, id) => (
    { ...prev, [id]: null }
  ), {});

  res.json({ ...defaults, ...zipObject(resultIds, gamesInfo) });
}));

router.get('/dicts', asyncHandler(async (req, res) => {
  const [themes, genres, playerPerspectives, platforms] = await Promise.all([
    IGDB()
      .fields('*')
      .request('/themes')
      .then(extrResData),
    IGDB()
      .fields('*')
      .request('/genres')
      .then(extrResData),
    IGDB()
      .fields('*')
      .request('/player_perspectives')
      .then(extrResData),
    IGDB()
      .fields('*')
      .where('id=(3,6,14)')
      .request('/platforms')
      .then(extrResData),
    IGDB()
      .fields('*')
      .request('/game_modes')
      .then(extrResData),
  ]);

  res.json({
    themes,
    genres,
    playerPerspectives,
    platforms,
  });
}));

module.exports = router;
