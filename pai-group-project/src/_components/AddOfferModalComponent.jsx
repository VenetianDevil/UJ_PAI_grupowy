import React, { useState } from 'react';
import "../_styles/loader.css";
import { Modal, Button, Form } from 'react-bootstrap';
import useAuth from '../_services/useAuth';
import { LoaderComponent } from './LoaderComponent';
import useOffers from '../_services/useOffers';
var _ = require('lodash');

export default function AddOfferModalComponent(props) {

  const { isLoggedIn, currentUserValue } = useAuth();
  const { addOffer } = useOffers();
  const modal = props.modal;
  const { jobOffer, setJobOffer } = useState();
  var callback = props.callback;

  const handleChange = async (e) => {
    // function handleChange(val) {
    let target = e.target;
    console.log(target.id);
    console.log(target.value);

    jobOffer({ ...jobOffer, [target.id]: target.value });
    // setUser({...user, [target.id]: target.value})

  }
  const handleChangeDebounce = _.debounce(handleChange, 500);

  function createOffer() {
    jobOffer.companyID = currentUserValue().id;
    
    addOffer(jobOffer)
      .then(data => {
        callback();
      })
      .catch(error => {

      })
  }

  return (
    <div>
      <Modal show={!!modal.show} onHide={callback} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Dodaj nową ofertę</Modal.Title>
        </Modal.Header>
        <Form onSubmit={createOffer}>
          <Modal.Body>

            <Form.Group className="mb-3">
              <Form.Label>Miejsce pracy *</Form.Label>
              <Form.Control id="address" type="text" placeholder="Adres" onChange={e => handleChangeDebounce(e)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Etat *</Form.Label>
              <Form.Control id="workMode" type="text" placeholder="Etat" onChange={e => handleChangeDebounce(e)} required />
              <Form.Text>Pełen etat, staż itp.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tryb pracy *</Form.Label>
              <Form.Control id="remote" type="text" placeholder="Tryb" onChange={e => handleChangeDebounce(e)} required />
              <Form.Text>Zdalna/Stacjonarna</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Informacje o stanowisku *</Form.Label>
              <Form.Control id="info" as="textarea" rows={3} placeholder="Lorem ipsum..." onChange={e => handleChangeDebounce(e)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link do oferty (ofc) *</Form.Label>
              <Form.Control id="officialOfferUrl" type="text" placeholder="http://...." onChange={e => handleChangeDebounce(e)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Koniec rekruatacji *</Form.Label>
              <Form.Control id="endDate" type="date" placeholder="" onChange={e => handleChangeDebounce(e)} required />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button type="submit" variant="success">
              Utwórz
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

