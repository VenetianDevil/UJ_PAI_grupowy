import { environment } from '../environment.ts';

function useServerService() {
  async function request(method, url, data) {
    url = `${environment.serverUrl}${url}`;

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.message) {
            console.info(res.message);
          }

          return res;
        })
        .catch(error => {
          console.error(`error: ${error.message}`);
        })

      return response;
    } catch (err) {
      console.error(err)
    }
  }

  return [request];
}

export default useServerService;
