import React from 'react';
import "../_styles/loader.css";
import { Modal, Button, Row, Col } from 'react-bootstrap';
import useAuth from '../_services/useAuth';
import { LoaderComponent } from './LoaderComponent';
import useOffers from '../_services/useOffers';
import { NotificationManager } from 'react-notifications';

export default function OfferModalComponent(props) {

  const { applyForAJob } = useOffers();
  const { isLoggedIn, currentUserValue } = useAuth();
  const modal = props.modal;
  const jobOffer = modal.data;
  var callback = props.callback;

  function apply() {
    applyForAJob({ offerID: jobOffer.ID, userID: currentUserValue().ID })
      .then((data) => {
        NotificationManager.success("Złożyłeś podanie o pracę", "Sukces!");
        callback();
      })
      .catch(error => {
        NotificationManager.error("Coś poszło nie tak.", "Błąd")
      })
  }

  return (
    <div>
      <Modal show={!!modal.show} onHide={callback} centered size="lg">
        {!!jobOffer ?
          <div>
            <Modal.Header closeButton>
              <Modal.Title>#{jobOffer.ID} {jobOffer.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={12} >
                  <p><b>Firma:</b> {jobOffer.companyName}</p>
                  <p><b>Miejsce pracy:</b> {jobOffer.address}</p>
                  <p><b>Koniec rekrutacji:</b> {jobOffer.endDate}</p>
                  <p><b>Etat:</b> {jobOffer.workMode}</p>
                  <p><b>Tryb:</b> {jobOffer.remote}</p>
                  <p><a target="_blank" href={jobOffer.officialOfferUrl} rel="nofollow">Link do oferty</a></p>
                  <p>{jobOffer.info}</p>
                </Col>

              </Row>
            </Modal.Body>
            {
              isLoggedIn && currentUserValue().type == 1 ?
                <Modal.Footer>
                  <Button variant="primary" onClick={apply}>
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

