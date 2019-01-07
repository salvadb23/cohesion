// controller/app.js
const Promise = require('bluebird');
const express = require('express');
const asyncHandler = require('express-async-handler');
const apicalypse = require('apicalypse').default;
const steamWrapper = require('steam-wrapper');
const intersection = require('array-intersection');
const flatten = require('array-flatten');

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

router.get('/:host', asyncHandler(async (req, res) => {
  const hostId = req.params.host;
  let friendIds = req.query.friends;

  const steamIds = [hostId];

  if (friendIds != null) {
    if (typeof friendIds === 'string' || friendIds instanceof String) {
      friendIds = friendIds.split(',');
    }

    steamIds.push(...friendIds);
  }

  const userGames = await Promise.map(steamIds, steamId => Steam.GetOwnedGames(steamId));
  const sharedGames = intersection(...userGames);

  const batches = [];
  for (let i = 0; i < sharedGames.length; i += 50) {
    batches.push(sharedGames.splice(i, i + 50));
  }

  const [gameBatches, playerSummaries] = await Promise.all([
    Promise.map(batches, (batch) => {
      // external_games.uid returns incorrect results, using URLs
      const urls = batch.map(id => `https://store.steampowered.com/app/${id}`);

      const query = IGDB()
        .fields([
          'name',
          'cover.image_id',
        ])
        .limit(50)
        .where([
          'game_modes.slug = "multiplayer"',
          `websites.url = ("${urls.join('","')}")`,
        ]);

      return query.request('/games');
    }),
    Steam.GetPlayerSummaries(steamIds),
  ]);

  const games = flatten(gameBatches.map(batch => batch.data));
  // https://stackoverflow.com/a/45898081/10336544
  const { [hostId]: host, ...friends } = playerSummaries;

  res.render('app', { host, friends, games });
}));

module.exports = router;
