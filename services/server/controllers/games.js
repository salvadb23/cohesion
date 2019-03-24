const express = require('express');
const asyncHandler = require('express-async-handler');
const keyBy = require('lodash/keyBy');
const chunk = require('lodash/chunk');
const difference = require('lodash/difference');

const Game = require('../models/game');
const IGDB = require('../utils/igdb');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  let { appIds: ids } = req.query;

  if (typeof ids === 'string' || ids instanceof String) {
    ids = ids.split(',');
  }

  const games = await Game.find({ appid: { $in: ids } });

  const batchSize = 10;
  const batches = chunk(difference(ids, games.map(game => game.appid), batchSize));

  const newGames = await Game.create(
    (await Promise.all(batches.map((batch) => {
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
        .then(r => r.data);
    })))
      .flat()
      .map((game) => {
        // More IGDB free tier circumventing, need to get the steam appid
        const { websites, ...newGame } = game;
        const { url } = websites.filter(site => site.url.startsWith('https://store.steampowered.com/app/'))[0];
        const appid = url.split('/').slice(-1)[0];

        return { appid, ...newGame };
      }),
  );

  // Those that aren't found should default to null for client use.
  const defaults = Object.assign(...ids.map(id => ({ [id]: null })));

  res.json({ ...defaults, ...keyBy(games.concat(newGames), 'appid') });
}));

module.exports = router;
