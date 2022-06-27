import React, { useEffect, useState } from 'react';
import { LoaderComponent } from '../_components/LoaderComponent';
import useAuth from '../_services/useAuth';
import { Row, Button, Col, Form, Table } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { wait } from '@testing-library/user-event/dist/utils';
import { OffersComponent } from '../_components/OffersComponent';
var _ = require('lodash');

function Account() {
  const { isLoggedIn, currentUserValue } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState({
    ID: 0,
    type: 1,
    email: "dnaod@google.com",
    imageUrl: "https://st2.depositphotos.com/1009634/7235/v/450/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
    givenName: "Tomek", // user
    familyName: "Kowalski", // user
    phoneNumber: "123456789", // user
    companyName: "Moja super firma", // company 
    hqLocation: "Kraków", // company
    info: "Jakiś opis profilu. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    linkedIn: "https://www.linkedin.com/?trk=seo-authwall-base_nav-header-logo",
    instagram: "https://www.instagram.com/",
    github: "https://github.com/", // user
    portfolioUrl: "https://www.instagram.com/", // user
    cvPdfUrl: "https://api.ngo.pl/media/get/108219",
    companyUrl: "https://www.ibm.com/pl-pl" // company
  })
  const [newUserData, setNewUserData] = useState({ ID: user.ID });
  const [isLoading, setIsLoading] = useState(false);

  let navigate = useNavigate();

  const handleChange = async (e) => {
    // function handleChange(val) {
    let target = e.target;
    console.log(target.id);
    console.log(target.value);

    setNewUserData({ ...newUserData, [target.id]: target.value });
    // setUser({...user, [target.id]: target.value})

    console.log(newUserData);
  }
  const handleChangeDebounce = _.debounce(handleChange, 500);

  function startEditMode() {
    setEditMode(true);
    setNewUserData({})
  }

  const cancelEditMode = async (e) => {
    setEditMode(false);
    document.getElementsByTagName("form")[0].reset();
    // window.reload();
  }

  const saveChanges = async (e) => {
    e.preventDefault();
    setEditMode(false);

    // send new user data to backend for usser update
  }

  // if (!isLoggedIn) {
  //   navigate("/logowanie");
  // }

  if (isLoggedIn) {
    user = currentUserValue();
  }

  if (isLoading) {
    return (<LoaderComponent></LoaderComponent>)
  }

  return (
    <div>
      <section className='mb-5'>
        <h2>Konto</h2>
        <div className="float-end" style={{ marginTop: "-40px" }}>{!editMode ? <Button type="button" onClick={startEditMode}>Edytuj</Button> : null} </div>
        <Link className='w-100 text-center' to={`/profil/${user.ID}`}>Zobacz swój profil</Link>

        <Form id="accountForm" onSubmit={saveChanges}>
          <Row>
            <Col sm="12" md="6">
              <h3>Informacje</h3>

              {user.type == 1 ?
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Imię *</Form.Label>
                    <Form.Control id="givenName" type="text" placeholder="Given Name" defaultValue={user.givenName} onChange={e => handleChangeDebounce(e)} required disabled={!editMode} />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Nazwisko *</Form.Label>
                    <Form.Control id="familyName" type="text" placeholder="Family Name" defaultValue={user.familyName} onChange={e => handleChangeDebounce(e)} required disabled={!editMode} />
                  </Form.Group>
                </div>
                :
                <Form.Group className="mb-3">
                  <Form.Label>Nazwa firmy *</Form.Label>
                  <Form.Control id="companyName" type="text" placeholder="Family Name" defaultValue={user.companyName} onChange={e => handleChangeDebounce(e)} required disabled={!editMode} />
                </Form.Group>
              }
              <Form.Group className="mb-3">
                <Form.Label>E-mail</Form.Label>
                <Form.Control id="email" type="email" placeholder="abc@gmail.com" defaultValue={user.email} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
              </Form.Group>

              {user.type == 1 ?

                <Form.Group className="mb-3">
                  <Form.Label>Numer telefonu</Form.Label>
                  <Form.Control id="phoneNumber" type="phone" placeholder="123456789" defaultValue={user.phoneNumber} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                </Form.Group>

                :

                <Form.Group className="mb-3">
                  <Form.Label>Lokalizacja siedziby</Form.Label>
                  <Form.Control id="hqLocation" type="phone" placeholder="123456789" defaultValue={user.hqLocation} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                </Form.Group>

              }
              <Form.Group className="mb-3">
                <Form.Label>Zdjęcie profilowe Url</Form.Label>
                <Form.Control id="imageUrl" type="phone" placeholder="https://st2.depositphotos.com/1009634/7235.jpg" defaultValue={user.imageUrl} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Informacja: </Form.Label>
                <Form.Control id="info" as="textarea" rows={3} placeholder="Lorem ipsum..." defaultValue={user.info} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
              </Form.Group>
            </Col>
            <Col sm="12" md="6">
              <h3>Linki</h3>

              <Form.Group className="mb-3">
                <Form.Label>LinkedIn</Form.Label>
                <Form.Control id="linkedIn" type="text" placeholder="https://www.linkedin.com/?trk=seo-authwall-base_nav-header-logo" defaultValue={user.linkedIn} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Instagram</Form.Label>
                <Form.Control id="instagram" type="text" placeholder="https://www.instagram.com/" defaultValue={user.instagram} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
              </Form.Group>

              {user.type == 1 ?
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Github</Form.Label>
                    <Form.Control id="github" type="text" placeholder="https://github.com/" defaultValue={user.github} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Portfolio</Form.Label>
                    <Form.Control id="portfolioUrl" type="text" placeholder="https://www.dreamstime.com" defaultValue={user.portfolioUrl} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>CV PDF (url)</Form.Label>
                    <Form.Control id="cvPdfUrl" type="text" placeholder="https://st2.depositphotos.com/1009634/7235.pdf" defaultValue={user.cvPdfUrl} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                  </Form.Group>
                </div>
                :
                <Form.Group className="mb-3">
                  <Form.Label>Strona oficjalna firmy (url)</Form.Label>
                  <Form.Control id="companyUrl" type="text" placeholder="https://st2.depositphotos.com/1009634/7235.pdf" defaultValue={user.companyUrl} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                </Form.Group>
              }

            </Col>
            <Col sm="12">
              <div className='float-end'>
                {editMode ? <Button variant="danger" type="button" onClick={cancelEditMode} >Anuluj</Button> : null}
                &nbsp;
                {editMode ? <Button variant="success" type="submit" form="accountForm" >Zapisz</Button> : null}

              </div>
            </Col>
          </Row>


        </Form>

      </section>

      {
        user.type == 1 ?
          <section>
            <h2>Rekrutacje:</h2>

            <Table responsive="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nazwa stanowiska</th>
                  <th>Firma</th>
                  <th>Data</th>
                  <th title="0-złożona, 1-przyjęta, 2-W trakcie kwalifikacji, 3-Rozpatrzona">Etap</th>{/* etapy rekrutacji 0-złożona, 1-przyjęta, 2-W trakcie kwalifikacji, 3-Rozpatrzona */}
                  <th>Status</th>{/* 0-przetwarzana, 1-przyjęta, 2-odrzucona, 3-anulowana */}
                </tr>
              </thead>
            </Table>
          </section>
          : null
      }

      {
        user.type == 2 ?
          <section>
            <OffersComponent></OffersComponent>
          </section>
          : null
      }
    </div >
  )
}

export default Account;
