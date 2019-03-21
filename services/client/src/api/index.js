import axios from 'axios';
import qs from 'qs';

const paramsSerializer = qs.stringify;

const resToData = res => res.data;

export function getPlayers(...steamIds) {
  return axios.get('/api/profiles', {
    params: { steamIds },
    paramsSerializer,
  })
    .then(resToData);
}

export function getGames(...appIds) {
  return axios.get('/api/details', {
    params: { appIds },
    paramsSerializer,
  })
    .then(resToData);
}

export function getGlossaries() {
  return axios.get('/api/glossaries')
    .then(resToData);
}
