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
  const [user, setUser] = useState({});
  const [newUserData, setNewUserData] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [modal, openModal, closeModal] = useModal("AddOfferModalComponent");
  const { getUser, updateUser } = useUsers();

  let navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      if (!!currentUserValue()) {
        getUser(currentUserValue().id)
          .then((data) => {
            if (!!data) {
              console.log('data jest', data);
              
              setUser(data);
              setNewUserData({ id: data.id })
            }
            setLoading(false);
          })
          .catch(error => {
            // setUser({
            //   id: 38,
            //   type: currentUserValue().type,
            //   email: "dnaod@google.com",
            //   imageUrl: "https://st2.depositphotos.com/1009634/7235/v/450/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
            //   givenName: "Tomek", // user
            //   familyName: "Kowalski", // user
            //   phoneNumber: "123456789", // user
            //   companyName: "Moja super firma", // company 
            //   HQLocation: "Kraków", // company
            //   info: "Jakiś opis profilu. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            //   linkedIn: "https://www.linkedin.com/?trk=seo-authwall-base_nav-header-logo",
            //   instagram: "https://www.instagram.com/",
            //   gitHub: "https://gitHub.com/", // user
            //   portfolioUrl: "https://www.instagram.com/", // user
            //   cvURL: "https://api.ngo.pl/media/get/108219",
            //   companyURL: "https://www.ibm.com/pl-pl" // company
            // })
            // setNewUserData({ id: 0 })
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
        if (!!data.user_data) {
          setUser(_.merge(user, data.user_data));
          cancelEditMode();
        }
      })

  }

  if (!isLoggedIn) {
    navigate("/logowanie");
  }

  if (!!isLoading) {
    return (<LoaderComponent></LoaderComponent>)
  }

  if(!isLoading){
    console.log("nud", newUserData);
    
  }

  return (
    <div>
      <section className='mb-5'>
        <h2>Konto {user.login || "-"}</h2>
        <div className="float-end" style={{ marginTop: "-40px" }}>{!editMode ? <Button type="button" onClick={startEditMode}>Edytuj</Button> : null} </div>
        <Link className='w-100 text-center' to={`/profil/${user.id}`}>Zobacz swój profil</Link>

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
                  <Form.Control id="companyName" type="text" placeholder="Company Name" defaultValue={user.companyName} onChange={e => handleChangeDebounce(e)} required disabled={!editMode} />
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
                  <Form.Control id="HQLocation" type="phone" placeholder="Rynek 1, 29-987 Kraków" defaultValue={user.HQLocation} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                </Form.Group>

              }
              <Form.Group className="mb-3">
                <Form.Label>Zdjęcie profilowe Url</Form.Label>
                <Form.Control id="imageURL" type="phone" placeholder="https://st2.depositphotos.com/1009634/7235.jpg" defaultValue={user.imageURL} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
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
                <Form.Control id="linkedIn" type="text" placeholder="https://www.linkedin.com/" defaultValue={user.linkedIn} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
              </Form.Group>


              <Form.Group className="mb-3">
                <Form.Label>Instagram</Form.Label>
                <Form.Control id="instagram" type="text" placeholder="https://www.instagram.com/" defaultValue={user.instagram} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
              </Form.Group>

              {user.type == 1 ?
                <div>
                  <Form.Group className="mb-3">
                    <Form.Label>Github</Form.Label>
                    <Form.Control id="gitHub" type="text" placeholder="https://github.com/" defaultValue={user.gitHub} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Portfolio</Form.Label>
                    <Form.Control id="portfolioURL" type="text" placeholder="https://www.dreamstime.com" defaultValue={user.portfolioURL} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>CV PDF (url)</Form.Label>
                    <Form.Control id="cvURL" type="text" placeholder="https://st2.depositphotos.com/1009634/7235.pdf" defaultValue={user.cvURL} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                  </Form.Group>
                </div>
                :
                <Form.Group className="mb-3">
                  <Form.Label>Strona oficjalna firmy (url)</Form.Label>
                  <Form.Control id="companyURL" type="text" placeholder="https://st2.depositphotos.com/1009634/7235.pdf" defaultValue={user.companyURL} onChange={e => handleChangeDebounce(e)} disabled={!editMode} />
                </Form.Group>
              }

            </Col>
            <Col sm="12">
              <div className='float-end'>
                {editMode ? <Button id="cancel" variant="danger" type="button" onClick={cancelEditMode} >Anuluj</Button> : null}
                &nbsp;
                {editMode ? <Button id="save" variant="success" type="submit" form="accountForm" >Zapisz</Button> : null}

              </div>
            </Col>
          </Row>


        </Form>

      </section>

      {
        user.type == 2 ?
          <section>
            <Button className="position-absolute" onClick={openModal}>Dodaj nową ofertę</Button>
            <OffersComponent companyID={user.id}></OffersComponent>
            {modal.show ? <AddOfferModalComponent modal={modal} callback={closeModal}></AddOfferModalComponent> : null}
          </section>
          : null
      }

      <section>
        <RecruitmentsComponent givenName={user.givenName} familyName={user.familyName}></RecruitmentsComponent>
      </section>
    </div >
  )
}

export default Account;
