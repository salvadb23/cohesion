// controller/app.js
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
  let { steamIds: ids } = req.query;

  if (typeof ids === 'string' || ids instanceof String) {
    ids = ids.split(',');
  }

  const libraries = await Promise.all(ids.map(id => Steam.GetOwnedGames(id)));

  res.json(zipObject(ids, libraries));
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
      .where(`websites.url=("${urls.join('","')}")`);

    return query.request('/games');
  }));

  gamesInfo = gamesInfo.map(batch => batch.data).flat();

  const resultIds = gamesInfo.map((info) => {
    const { url } = info.websites.filter(site => site.url.startsWith('https://store.steampowered.com/app/'))[0];
    return url.split('/').slice(-1)[0];
  });

  res.json(zipObject(ids, resultIds));
}));

module.exports = router;
