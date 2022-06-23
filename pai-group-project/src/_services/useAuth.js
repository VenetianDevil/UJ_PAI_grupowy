import { useEffect, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { NotificationManager } from 'react-notifications';
import useServerService from './useServerService';

var currentUserSubject;
var currentUser;

function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [request] = useServerService();

  useEffect(() => {
    console.log("-------------------------------------- auth effect ----------------------------------------");

    if (!isLoggedIn) {
      if (!!localStorage.getItem('currentUser')) {
        console.log('\tsetting values');
        currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
        currentUser = currentUserSubject.asObservable();
        setIsLoggedIn(true);
        console.log('\tsetting logged to true ');
      } else {
        console.log("nie mam currenUsera w localStorage / wylogowany");
      }

      console.log(currentUser);
    } else {
      console.log('auth, logged in', isLoggedIn);
    }

  }, [isLoggedIn])

  function register(credentials) {
    console.log("-------------------------------------- LOGIN ----------------------------------------");
    if (!!credentials) {
      if (!currentUserSubject) {
        return request('POST', `/users/register`, credentials)
          .then((user) => {
            if(!!user){
              console.log('\tauth login proceed');
              localStorage.setItem('currentUser', JSON.stringify(user));
              currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
              currentUserSubject.next(user);
              setIsLoggedIn(true);
            }

            return user;
          })
          .catch(error => {
            NotificationManager.error(error.message, 'Error!');
            console.error(error)
          })
      } else {
        NotificationManager.info("Alredy logged", 'Error!');
      }
    } else {
      NotificationManager.error("No credentials to register", 'Error!');
    }
  }

  function login(credentials) {
    console.log("-------------------------------------- LOGIN ----------------------------------------");
    if (!!credentials) {
      if (!currentUserSubject) {
        return request('POST', `/users/login`, credentials)
          .then((user) => {
            if(!!user){
              console.log('\tauth login proceed');
              localStorage.setItem('currentUser', JSON.stringify(user));
              currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
              currentUserSubject.next(user);
              setIsLoggedIn(true);
            }

            return user;
          })
          .catch(error => {
            NotificationManager.error(error.message, 'Error!');
            console.error(error)
          })
      } else {
        NotificationManager.info("Alredy logged", 'Error!');
      }
    } else {
      NotificationManager.error("No credentials to log in", 'Error!');
    }
  }

  function currentUserValue() {
    console.log("-------------------------------------- CURENT USER VALUE ----------------------------------------");
    console.log(currentUserSubject);

    return currentUserSubject ? currentUserSubject.value : null;
  }

  function logout() {
    console.log("-------------------------------------- LOGOUT ----------------------------------------");
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    setIsLoggedIn(false)
  }

  return { isLoggedIn, register, login, logout, currentUserValue };
}

export default useAuth;
