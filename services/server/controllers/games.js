const express = require('express');
const asyncHandler = require('express-async-handler');

const zipObject = require('lodash/zipObject');
const chunk = require('lodash/chunk');
const isEmpty = require('lodash/isEmpty');
const mapValues = require('lodash/mapValues');

// const Game = require('../models/game');
const cache = require('../utils/redis');
const IGDB = require('../utils/igdb');
const { nullToFalse, falseToNull } = require('../utils/conversions');

const router = express.Router();

const batchSize = 10;

const getGames = async (ids) => {
  const cachedGames = zipObject(
    ids,
    (await cache.mgetAsync(...ids.map(id => `/games/${id}`)))
      .map(JSON.parse),
  );

  const missingGames = Object.entries(cachedGames)
    .filter(([, game]) => game === null)
    .map(([id]) => id);

  const defaults = missingGames
    .map(id => ({ [id]: null }));

  const igdbGames = (await Promise.all(
    chunk(missingGames, batchSize)
      .map(async (batch) => {
        const urls = batch.map(id => `https://store.steampowered.com/app/${id}`);

        const res = await IGDB()
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
          .where([
            `websites.url=("${urls.join('","')}")`,
            'parent_game=null', // Ignore DLC
          ])
          .request('/games');

        return res.data.map((game) => {
          const { websites, ...newGame } = game;
          const { url } = websites.find(site => site.url.startsWith('https://store.steampowered.com/app/'));
          const [appid] = url.split('/').slice(-1);

          return { [appid]: { appid, ...newGame } };
        });
      }),
  )).flat();

  const newGames = Object.assign(
    {},
    ...defaults,
    ...igdbGames,
  );

  if (!isEmpty(newGames)) {
    await cache.msetAsync(
      ...Object.entries(newGames)
        .map(([id, game]) => [`/games/${id}`, JSON.stringify(nullToFalse(game))])
        .flat(),
    );
  }

  return { ...mapValues(cachedGames, falseToNull), ...newGames };
};

router.get('/', asyncHandler(async (req, res) => {
  let { appIds: ids } = req.query;

  if (typeof ids === 'string' || ids instanceof String) {
    ids = ids.split(',');
  }
  const games = await getGames(ids);

  res.json(games);
}));

module.exports = router;
