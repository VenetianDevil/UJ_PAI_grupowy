import React, { useEffect, useState } from 'react';
import { LoaderComponent } from '../_components/LoaderComponent';
import useAuth from '../_services/useAuth';

function Logout(props) {

  const {isLoggedIn, logout, currentUserValue} = useAuth();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log("-------------------------------------- logger effect ----------------------------------------");
    console.log('logout logged in: ', isLoggedIn)
    console.log('logout is loading: ', isLoading)

    if (!!isLoggedIn) {
      logout();
    } else {
      console.log('logger setting loading on false');
      setLoading(false);
      props.callback(new Date());
    }

  }, [isLoggedIn])

  if (isLoading && !isLoggedIn && !currentUserValue()) {
    return (
      <LoaderComponent></LoaderComponent>
    )
  }

  return (
    <div>
      <h2>Goodbye</h2>
      {/* <Link to="/" ><Button type='button'>Produkty</Button></Link> */}
    </div>
  )
}

export default Logout;
