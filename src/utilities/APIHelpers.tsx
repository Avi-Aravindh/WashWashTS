export const fetchAPI = (url: string) => {
  let promise = new Promise((resolve, reject) => {
    fetch(url, {
      method: 'GET',
    })
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

export const fetchPOSTAPI = (url: string, data: any) => {
  let promise = new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      // body: JSON.stringify(data),
      body: data,
    })
      .then((response) => response.json())
      .then((json) => {
        console.log('response from post', json);
        resolve(json);
      })
      .catch((error) => {
        console.error('Data post error', url, error);
        reject(error);
      });
  });

  return promise;
};
