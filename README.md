# Cohesion Compose

This is the easy way to get a local version up and running.

# Usage

1. Install [Docker](https://www.docker.com/get-started/) and [Docker Compose](https://docs.docker.com/compose/install/)
1. Get your [Steam API key](https://steamcommunity.com/dev/apikey) and [IGDB API key](https://api.igdb.com/)
1. Copy server.example.env to server.env and fill in your keys

## Development

1. Run `./dev-compose up`
1. Go to [localhost:8080](http://localhost:8800)

## Production

1. Start Traefik using their [quickstart config](https://docs.traefik.io/#the-traefik-quickstart-using-docker)
1. Create a `.env` file with `DOMAIN=[SUB.YOUR_DOMAIN]`
1. Run `./prod-compose up`
1. Visit [SUB.YOUR_DOMAIN]
