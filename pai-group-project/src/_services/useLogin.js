import useServerService from './useServerService';

function useLogin() {
  const [request] = useServerService();

  function signUp(credentials) {
    return request('POST', `/auth/register`, credentials);

  }

  function signIn(credentials) {
    return request('POST', `/auth/login`, credentials);
  }

  return { signUp, signIn };
}

export default useLogin;
