import React, { useState, useEffect } from 'react';
import "../_styles/loader.css";
import { Modal, Button, Form } from 'react-bootstrap';
import useAuth from '../_services/useAuth';
import { LoaderComponent } from './LoaderComponent';
import useOffers from '../_services/useOffers';
var _ = require('lodash');

export default function AddOfferModalComponent(props) {

  const { isLoggedIn, currentUserValue } = useAuth();
  const { addOffer, workModes, remoteStates } = useOffers();
  const modal = props.modal;
  const [jobOffer, setJobOffer] = useState();
  var callback = props.callback;

  useEffect(() => {
    if (currentUserValue()) {
      setJobOffer({companyID: currentUserValue().id, workMode: 1, remote:1, categories: ""})
    }
  }, [currentUserValue().id])

  const handleChange = async (e) => {
    // function handleChange(val) {
    let target = e.target;

    setJobOffer({ ...jobOffer, [target.id]: target.value });
  }
  const handleChangeDebounce = _.debounce(handleChange, 500);

  const createOffer = async e => {
    e.preventDefault();
    // jobOffer.companyID = currentUserValue().id;
    // jobOffer.categories = "";
    
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
              <Form.Label>Tytuł *</Form.Label>
              <Form.Control id="title" type="text" placeholder="Tytuł oferty" onChange={e => handleChangeDebounce(e)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Miejsce pracy *</Form.Label>
              <Form.Control id="address" type="text" placeholder="Adres" onChange={e => handleChangeDebounce(e)} required />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Etat *</Form.Label>
              <Form.Select id="workMode" placeholder="Etat" onChange={e => handleChangeDebounce(e)} required>{}
                {workModes.map((mode, index) => (<option value={index+1}>{mode}</option>))}
              </Form.Select>
              <Form.Text>Pełen etat, staż itp.</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Tryb pracy *</Form.Label>
              <Form.Select id="remote" placeholder="Tryb" onChange={e => handleChangeDebounce(e)} required>{/*0-złożona, 1-zaakceptwana, 2-W trakcie kwalifikacji, 3-Rozpatrzona*/}
                {remoteStates.map((remote, index) => (<option value={index+1}>{remote}</option>))}
              </Form.Select>
              <Form.Text>Zdalna/Stacjonarna</Form.Text>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Informacje o stanowisku *</Form.Label>
              <Form.Control id="offerInfo" as="textarea" rows={3} placeholder="Lorem ipsum..." onChange={e => handleChangeDebounce(e)} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Link do oferty (ofc)</Form.Label>
              <Form.Control id="offerURL" type="text" placeholder="http://...." onChange={e => handleChangeDebounce(e)} />
            </Form.Group>

            {/* <Form.Group className="mb-3">
              <Form.Label>Koniec rekruatacji *</Form.Label>
              <Form.Control id="endDate" type="date" placeholder="" onChange={e => handleChangeDebounce(e)} required />
            </Form.Group> */}
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

