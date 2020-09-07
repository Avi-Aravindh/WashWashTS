export const fetchAPI = (url: string) => {
  console.log('url', url);
  let promise = new Promise((resolve, reject) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((error) => {
        console.error('Data Fetch error', url, error);
        reject(error);
      });
  });

  return promise;
};
