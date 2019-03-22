// controller/app.js
const express = require('express');
const asyncHandler = require('express-async-handler');
const zipObject = require('lodash/zipObject');
const keyBy = require('lodash/keyBy');
const merge = require('lodash/merge');
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

const router = express.Router();

// Gets player info and game libraries.
router.get('/players', asyncHandler(async (req, res) => {
  let { steamIds: ids } = req.query;

  if (typeof ids === 'string' || ids instanceof String) {
    ids = ids.split(',');
  }

  const [libraries, profiles] = await Promise.all([
    Promise.all(ids.map(id => Steam.GetOwnedGames(id))),
    Steam.GetPlayerSummaries(...ids),
  ]);

  merge(profiles, zipObject(ids, libraries.map(games => ({ games }))));

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

  const gamesInfo = (await Promise.all(batches.map((batch) => {
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
  }))).flat();

  // Highly likely that not every game is on IGDB with its Steam URL, need to extract ids from urls
  const resultIds = gamesInfo.map((info) => {
    const { url } = info.websites.filter(site => site.url.startsWith('https://store.steampowered.com/app/'))[0];
    return url.split('/').slice(-1)[0];
  });

  // Those that aren't found should default to null for client use.
  const defaults = Object.assign({}, ...ids.map(id => ({ [id]: null })));

  res.json({ ...defaults, ...zipObject(resultIds, gamesInfo) });
}));

// Index IGDB results by id for easier use in client
const keyArrById = arr => keyBy(arr, 'id');

// For mapping id results from /details to names
router.get('/glossaries', asyncHandler(async (req, res) => {
  const [themes, genres, playerPerspectives, platforms] = await Promise.all([
    IGDB()
      .fields('name')
      .request('/themes')
      .then(extrResData)
      .then(keyArrById),
    IGDB()
      .fields('name')
      .request('/genres')
      .then(extrResData)
      .then(keyArrById),
    IGDB()
      .fields('name')
      .request('/player_perspectives')
      .then(extrResData)
      .then(keyArrById),
    IGDB()
      .fields('name')
      .where('id=(3,6,14)')
      .request('/platforms')
      .then(extrResData)
      .then(keyArrById),
    IGDB()
      .fields('name')
      .request('/game_modes')
      .then(extrResData)
      .then(keyArrById),
  ]);

  res.json({
    themes,
    genres,
    playerPerspectives,
    platforms,
  });
}));

module.exports = router;
