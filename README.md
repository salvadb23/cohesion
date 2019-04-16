# Cohesion Compose

This is the easy way to get a local version up and running.

# Usage

1. Install [Docker](https://www.docker.com/get-started/) and [Docker Compose](https://docs.docker.com/compose/install/)
1. Get your [Steam API key](https://steamcommunity.com/dev/apikey) and [IGDB API key](https://api.igdb.com/)
1. run `cp .env.example .env` open `.env` and fill in your keys

## Development

1. Run `./dev-compose up`
1. Go to [localhost:8080](http://localhost:8800)

## Production

[nginx-proxy](https://github.com/jwilder/nginx-proxy) is a good candidate for routing, but I haven't tested it yet

1. Run `docker-compose up`
1. Route the client to `sub.yourdomain.com`
1. Route the server
