import axios from 'axios';
import qs from 'qs';

const paramsSerializer = params => qs.stringify(params, { indices: false });

export async function getPlayers(...steamIds) {
  const res = await axios.get('/api/players', {
    params: { steamIds },
    paramsSerializer,
  });

  return res.data;
}

export async function getGames(...appIds) {
  const res = await axios.get('/api/games', {
    params: { appIds },
    paramsSerializer,
  });

  return res.data;
}

export async function getGlossaries() {
  const res = await axios.get('/api/glossaries');

  return res.data;
}
