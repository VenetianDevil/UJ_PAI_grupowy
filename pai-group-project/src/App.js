import React, { useEffect, useState } from 'react';
import './App.css';
import 'react-notifications/lib/notifications.css';
import {
  Routes,
  Route,
  Navigate,
  useLocation
} from "react-router-dom";
import { Navbar, Container, Nav } from 'react-bootstrap';
import { NotificationContainer } from 'react-notifications';
import useAuth from './_services/useAuth';
import MainPage from './_page/mainPage';
import Logout from './_page/logout';
import JobOffers from './_page/jobOffers';
import Companies from './_page/companies';
import Register from './_page/register';
import Login from './_page/login';
import Account from './_page/account';
import Profile from './_page/profile';

function App() {

  const [currentUrl, setCurrentUrl] = useState(useLocation().pathname);
  const handleSelect = (href) => { setCurrentUrl(href) };

  const { currentUserValue } = useAuth();
  const [_refresh, forceRefresh] = useState();

  return (
    <div className="App">
      <header className="">
        <Navbar bg="light" className="py-3 mb-5" >
          <Container>
            <Nav className='w-100' activeKey={currentUrl} onSelect={handleSelect}> {/*  */}
              <Navbar.Brand>
                <Nav.Link to="/" href="/">
                  <img src="/img/Koala-Logo-13.webp" height="60" className="d-inline-block align-top" alt="Logo" />
                </Nav.Link>
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav className='ms-auto' activeKey={currentUrl} onSelect={handleSelect}>
                <Navbar.Collapse id="basic-navbar-nav" >
                  {currentUserValue() ? <Navbar.Text>{currentUserValue().givenName} </Navbar.Text> : null}
                  <Nav.Link href="/oferty">Oferty</Nav.Link>
                  <Nav.Link href="/firmy">Firmy</Nav.Link>
                  <Nav.Link href="/konto">Konto</Nav.Link>
                  {currentUserValue() ? <Nav.Link href="/konto">Konto</Nav.Link> : null}
                  {!currentUserValue() ? <Nav.Link href="/rejestracja">Rejestracja</Nav.Link> : null}
                  {!currentUserValue() ? <Nav.Link href="/logowanie">Logowanie</Nav.Link> : null}
                  {currentUserValue() ? <Nav.Link href="/logout">Wyloguj</Nav.Link> : null}
                </Navbar.Collapse>
              </Nav>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <main>
        <Container>
          <Routes>
            {/* <Route path="/" element={<Navigate to="products" />} /> */}
            <Route path="/" element={<MainPage />} />
            <Route path="/oferty" element={<JobOffers />} />
            <Route path="/firmy" element={<Companies />} />
            <Route exact path='profil/:id' element={<Profile />}> </Route>
            <Route exact path='konto' element={<Account />}> </Route>
            <Route path="rejestracja" element={<Register />} />
            <Route path='logowanie' element={<Login />} />
            <Route path='logout' element={<Logout callback={forceRefresh} />} />
          </Routes>
        </Container>
      </main>

      <footer className="mt-5">

      </footer>
      <NotificationContainer />

    </div>
  );
}

export default App;
