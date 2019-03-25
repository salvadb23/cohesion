const express = require('express');
const asyncHandler = require('express-async-handler');

const zipObject = require('lodash/zipObject');
const merge = require('lodash/merge');

const SteamWrapper = require('steam-wrapper');

const router = express.Router();
const Steam = new SteamWrapper(process.env.STEAM_API_KEY);

router.get('/', asyncHandler(async (req, res) => {
  let { steamIds: ids } = req.query;

  if (typeof ids === 'string' || ids instanceof String) {
    ids = ids.split(',');
  }

  ids = (await Promise.all(ids.map(id => Steam.GetSteamId64(id)))).filter(Boolean);

  const [libraries, profiles] = await Promise.all([
    Promise.all(ids.map(id => Steam.GetOwnedGames(id))),
    Steam.GetPlayerSummaries(...ids),
  ]);

  merge(profiles, zipObject(ids, libraries.map(games => ({ games }))));

  res.json(profiles);
}));

module.exports = router;
