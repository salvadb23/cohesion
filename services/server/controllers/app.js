// controller/app.js
const Promise = require('bluebird');
const express = require('express');
const asyncHandler = require('express-async-handler');
const apicalypse = require('apicalypse').default;
const steamWrapper = require('steam-wrapper');
const zipObject = require('lodash.zipobject');

const Steam = steamWrapper();
const IGDB = () => apicalypse({
  baseURL: 'https://api-v3.igdb.com',
  headers: {
    Accept: 'application/json',
    'user-key': process.env.IGDB_API_KEY,
  },
  responseType: 'json',
});

const router = express.Router();

router.get('/library', asyncHandler(async (req, res) => {
  let { steamIds } = req.query;

  if (typeof steamIds === 'string' || steamIds instanceof String) {
    steamIds = steamIds.split(',');
  }

  const libraries = await Promise.map(steamIds, steamId => Steam.GetOwnedGames(steamId));

  res.json(zipObject(steamIds, libraries));
}));

router.get('/info', asyncHandler(async (req, res) => {
  let { appIds } = req.query;

  if (typeof appIds === 'string' || appIds instanceof String) {
    appIds = appIds.split(',');
  }

  const batchSize = 10;
  const batches = [];
  for (let i = 0; i < appIds.length; i += batchSize) {
    batches.push(appIds.slice(i, i + batchSize));
  }

  const gameBatches = await Promise.map(batches, (batch) => {
    const urls = batch.map(id => `https://store.steampowered.com/app/${id}`);

    const query = IGDB()
      .fields([
        'name',
        'game_modes.name',
        'game_engines.name',
        'themes.name',
        'keywords.name',
        'platforms.abbreviation',
        'cover.image_id',
        'genres.name',
        'websites.url',
      ])
      .limit(batchSize)
      .where(`websites.url = ("${urls.join('","')}")`);

    return query.request('/games');
  });

  const gamesInfo = gameBatches.map(batch => batch.data).flat();
  const ids = gamesInfo.map((gameInfo) => {
    const { url } = gameInfo.websites.filter(site => site.url.startsWith('https://store.steampowered.com/app/'))[0];
    return url.split('/').slice(-1)[0];
  });

  res.json(zipObject(ids, gamesInfo));
}));

module.exports = router;
