import { MOVIES_API_URL } from './apiUrls';

export function getRes(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export function getMovies() {
  return fetch(`${MOVIES_API_URL}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(getRes)
}