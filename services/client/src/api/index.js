import axios from 'axios';
import qs from 'qs';
// import flip from 'lodash/flip';
// import wrap from 'lodash/wrap';

// const paramsSerializer = wrap({ indices: false }, flip(qs.stringify));
const paramsSerializer = (params) => qs.stringify(params, { indices: false })

const resToData = res => res.data;

export function getPlayers(...steamIds) {
  return axios.get('/api/players', {
    params: { steamIds },
    paramsSerializer,
  })
    .then(resToData);
}

export function getGames(...appIds) {
  return axios.get('/api/games', {
    params: { appIds },
    paramsSerializer,
  })
    .then(resToData);
}

export function getGlossaries() {
  return axios.get('/api/glossaries')
    .then(resToData);
}
