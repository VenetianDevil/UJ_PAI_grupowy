import React, { useEffect, useState } from 'react';
import { LoaderComponent } from '../_components/LoaderComponent';
import useAuth from '../_services/useAuth';
import { Row, Button, Col, Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import OffersComponent from '../_components/OffersComponent';
import RecruitmentsComponent from '../_components/RecruitmentsComponent';
import useModal from '../_services/useModal';
import AddOfferModalComponent from '../_components/AddOfferModalComponent';
import useUsers from '../_services/useUsers';
import NotificationManager from 'react-notifications/lib/NotificationManager';
var _ = require('lodash');

function Account() {
  const { isLoggedIn, currentUserValue } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState()
  const [newUserData, setNewUserData] = useState();
  const [isLoading, setLoading] = useState(true);
  const [modal, openModal, closeModal] = useModal("AddOfferModalComponent");
  const { getUser, updateUser } = useUsers();

  let navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      if (!!currentUserValue()) {
        getUser(currentUserValue().ID)
          .then((data) => {
            if (!!data.user) {
              setUser(data.user);
              setNewUserData({ ID: data.user.ID })
            }
            setLoading(false);
          })
          .catch(error => {
            setUser({
              ID: 0,
              type: currentUserValue().type,
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
            setNewUserData({ ID: 0 })
            NotificationManager.error("Nie udało sie pobrać danych", "Error!");
            setLoading(false);
          })
      }
    }
  }, [isLoading])

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
  }

  const saveChanges = async (e) => {
    e.preventDefault();

    // send new user data to backend for user update
    updateUser(newUserData)
      .then((data) => {
        if (!!data.user) {
          setUser(data.user);
          cancelEditMode()
        }
      })

  }

  if (!isLoggedIn) {
    navigate("/logowanie");
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
        user.type == 2 ?
          <section>
            <Button className="position-absolute" onClick={openModal}>Dodaj nową ofertę</Button>
            <OffersComponent companyID={user.ID}></OffersComponent>
            {modal.show ? <AddOfferModalComponent modal={modal} callback={closeModal}></AddOfferModalComponent> : null}
          </section>
          : null
      }

      <section>
        <RecruitmentsComponent></RecruitmentsComponent>
      </section>
    </div >
  )
}

export default Account;
