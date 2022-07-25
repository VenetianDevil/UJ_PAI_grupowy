import useServerService from './useServerService';

function useUsers() {
  const [request] = useServerService();

  function getUser(userID) {
    return request('GET', `/users/user/${userID}`); //user albo company
  }

  function addUser(user) {
    return request('POST', `/user`, user);
  }

  function updateUser(user) {
    return request('PUT', `/user`, user); //user lub company profile
  }

  function getUserRecruitments(userID) {
    return request('GET', `/recruitments/user/${userID}/recruitmets`); //szukanie po userID
  }

  function updateUserRecruitment(recruitmentID, data) {
    return request('PUT', `/recruitmets/${recruitmentID}`, data); // anulowanie przez uzytkownika albo zmiana stage/status przez firmę
  }

  return { getUser, addUser, updateUser, getUserRecruitments, updateUserRecruitment };
}

export default useUsers;
