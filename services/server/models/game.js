const mongoose = require('mongoose');

const { Schema } = mongoose;

const Game = new Schema({
  appid: {
    type: String,
    required: true,
    unique: true,
  },
}, { strict: false });

module.exports = mongoose.model('Game', Game);
