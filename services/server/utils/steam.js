const SteamWrapper = require('@dacio/steam-wrapper');

module.exports = new SteamWrapper(process.env.STEAM_API_KEY);
