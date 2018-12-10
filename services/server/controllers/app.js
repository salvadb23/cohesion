// controller/app.js
const express = require('express');
const Promise = require('bluebird');
const intersection = require('array-intersection');
const apicalypse = require('@igdb/apicalypse').default;
const steamWrapper = require('steam-wrapper');

const router = express.Router();
const Steam = steamWrapper();
const IGDB = apicalypse({
    baseURL: "https://endpoint-alpha.igdb.com",
    headers: {
        'Accept': 'application/json',
        'user-key': process.env.IGDB_API_KEY
    },
    responseType: 'json'
});

router.get('/:host', (req, res) => {
    const hostId = req.params.host;
    let friendIds = req.query.friends;

    const steamIds = [hostId];

    if (friendIds != null) {
        if (typeof friendIds == 'string' || friendIds instanceof String) {
            friendIds = friendIds.split(',');
        }

        steamIds.push(...friendIds);
    }

    Promise.map(steamIds, steamId => Steam.GetOwnedGames(steamId))
        .then(userGames => {
            const sharedGames = intersection(...userGames);

            // Split into batches of 50 to comply with API limit.
            let batches = []
            for (let i = 0; i < sharedGames.length; i += 50) {
                batches.push(sharedGames.slice(i, i + 50));
            }

            return Promise.all([
                Promise.map(batches, batch => {
                    // external_games.uid returns incorrect results, using URLs
                    const urls = batch.map(id => `https://store.steampowered.com/app/${id}`);

                    const query = IGDB
                        .fields([
                            'name',
                            'cover.image_id',
                        ])
                        .limit(50)
                        .filter([
                            'game_modes.slug = "multiplayer"',
                            `websites.url = ("${urls.join('","')}")`
                        ]);

                    return query.request('/games');
                }),
                Steam.GetPlayerSummaries(steamIds)
            ]);
        })
        .then(([gameBatches, summaries]) => {
            const games = gameBatches.map(batch => batch.data).flat()
            // https://stackoverflow.com/a/45898081/10336544
            const { [hostId]: host, ...friends } = summaries;

            res.render('app', {
                host,
                friends,
                games
            });
        })
        .catch(error => {
            if(!res.headersSent) res.status(500).json(error.message);
            console.error(error);
        });
});

module.exports = router;
