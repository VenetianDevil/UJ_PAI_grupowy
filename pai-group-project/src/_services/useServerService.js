import { environment } from '../environment.ts';
import useAuth from './useAuth';

function useServerService() {

  const { currentUserValue } = useAuth();

  async function request(method, url, data) {
    url = `${environment.serverUrl}${url}`;

    try {
      const response = await fetch(url, {
        method: method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'bearer ' + (!!currentUserValue() ? currentUserValue().token : ''),

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
