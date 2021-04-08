const BASE_API = 'https://demo1030918.mockable.io/';

export function getAll() {
  return fetch(BASE_API)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }

      return response.json();
    })
    .then(json => json)
}

export const getKeys = () => (
  getAll()
    .then(modes => Object.keys(modes))
);

export const getValues = () => (
  getAll()
    .then(modes => Object.values(modes))
);