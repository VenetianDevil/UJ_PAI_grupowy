import React, { useState } from 'react';
import "../_styles/loader.css";
import { Modal, Button, Row, Col } from 'react-bootstrap';
import useAuth from '../_services/useAuth';
import { LoaderComponent } from './LoaderComponent';
import useOffers from '../_services/useOffers';
import { NotificationManager } from 'react-notifications';

export default function OfferModalComponent(props) {

  const { applyForAJob, workModes, remoteStates } = useOffers();
  const { isLoggedIn, currentUserValue } = useAuth();
  const [disableButton, setDisableButton] = useState(false);
  const modal = props.modal;
  const jobOffer = modal.data;
  var callback = props.callback;

  function apply() {
    setDisableButton(true)
    applyForAJob({ offerID: jobOffer.offerID, userID: currentUserValue().id })
      .then((data) => {
        NotificationManager.success("Złożyłeś podanie o pracę", "Sukces!");
        setDisableButton(false)
        callback();
      })
      .catch(error => {
        setDisableButton(false)
        NotificationManager.error("Coś poszło nie tak.", "Błąd")
      })
  }

  return (
    <div>
      <Modal show={!!modal.show} onHide={callback} centered size="lg">
        {!!jobOffer ?
          <div>
            <Modal.Header closeButton>
              <Modal.Title>#{jobOffer.offerID} {jobOffer.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={12} >
                  <p><b>Firma:</b> {jobOffer.companyName}</p>
                  <p><b>Miejsce pracy:</b> {jobOffer.address}</p>
                  {/* <p><b>Koniec rekrutacji:</b> {jobOffer.endDate}</p> */}
                  <p><b>Etat:</b> {jobOffer.workMode ? workModes[jobOffer.workMode-1] : "nieokreślony"}</p>
                  <p><b>Tryb:</b> {jobOffer.remote ? remoteStates[jobOffer.remote-1] : "nieokreślony"}</p>
                  {jobOffer.offerURL ? 
                  <p><a target="_blank" href={jobOffer.offerURL} rel="nofollow">Link do oferty</a></p> : null }
                  <p>{jobOffer.offerInfo}</p>
                </Col>

              </Row>
            </Modal.Body>
            {
              isLoggedIn && currentUserValue().type == 1 ?
                <Modal.Footer>
                  <Button variant="primary" onClick={apply} disabled={disableButton}>
                    Aplikuj
                  </Button>
                </Modal.Footer>
                : null
            }
          </div>
          : <LoaderComponent></LoaderComponent>
        }
      </Modal>
    </div>
  );
}

