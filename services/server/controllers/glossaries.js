const express = require('express');
const asyncHandler = require('express-async-handler');
const keyBy = require('lodash/keyBy');

const IGDB = require('../utils/igdb');

const router = express.Router();

const extrResData = res => res.data;
const keyArrById = arr => keyBy(arr, 'id');

let cache = null;
const resCache = (req, res, next) => {
  if (cache) {
    res.json(cache);
  } else {
    next();
  }
};

router.get('/', resCache, asyncHandler(async (req, res) => {
  const [
    // eslint-disable-next-line camelcase
    themes, genres, player_perspectives, platforms, game_modes,
  ] = await Promise.all([
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

  cache = {
    themes,
    genres,
    player_perspectives,
    platforms,
    game_modes,
  };

  res.json(cache);
}));

module.exports = router;
