import React, { useEffect, useState } from 'react';
import "../_styles/loader.css";
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import useAuth from '../_services/useAuth';
import { LoaderComponent } from './LoaderComponent';
import useUsers from '../_services/useUsers';
import useOffers from '../_services/useOffers';
import { NotificationManager } from 'react-notifications';

export default function RecruitmentModalComponent(props) {

  const modal = props.modal;
  const { isLoggedIn, currentUserValue } = useAuth();
  const { updateUserRecruitment } = useUsers();
  const [ disable ] = useState(!!currentUserValue() && currentUserValue().type == 1); //modyfikacja niedostępna dla zwykłego użytkownika, tylko firmy
  const [ disableForm, setDisableForm ] = useState(false);
  const [ recruitment, setRecruitment ] = useState(modal.data);
  const { stages, status } = useOffers();

  var callback = props.callback;

  function resign() {
    // changeState(3);
    recruitment.status = 3;
    updateRecruitment();
  }
  
  function changeStage(val) {
    setRecruitment({ ...recruitment, "stage": val });
  }

  function changeState(val) {
    setRecruitment({ ...recruitment, "status": val });
  }

  function updateRecruitment() {
    setDisableForm(true);
    updateUserRecruitment(recruitment.RecruitmentID, { stage: recruitment.stage, status: recruitment.status })
      .then(data => {
        setDisableForm(false);
        NotificationManager.success("Rekrutacja zaktualizowana", "Sukces!");
        callback();
      })
      .catch(error => {
        setDisableForm(false);
        NotificationManager.error("Aktializacja nieudana", "Błąd!");
        callback();

      })
  }

  const saveChanges = async e => {
    e.preventDefault();
    updateRecruitment();
  }


  return (
    <div>
      <Modal show={!!modal.show} onHide={callback} centered size="lg">
        {!!recruitment ?
          <div>
            <Modal.Header closeButton>
              <Modal.Title>#{recruitment.RecruitmentID} {recruitment.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={12} >
                  <Form onSubmit={saveChanges} id="recruitmentForm">
                    <p><b>Firma:</b> {recruitment.companyName}</p>
                    <p><b>Kandydat:</b> Jan Kowalski</p>
                    <p><b>Data złożenia podania:</b> {recruitment.date}</p>
                    <p><b className="float-start">Etap:</b> <Form.Select defaultValue={recruitment.stage} disabled={disable || disableForm} onChange={(e) => changeStage(e.target.value)} size="sm" className="w-auto">{/*0-złożona, 1-zaakceptwana, 2-W trakcie kwalifikacji, 3-Rozpatrzona*/}
                      {stages.map((stage, index) => (<option value={index}>{stage}</option>))}
                    </Form.Select></p>
                    <p><b className="float-start">Status:</b> <Form.Select defaultValue={recruitment.status} disabled={disable || disableForm} onChange={(e) => changeState(e.target.value)} size="sm" className="w-auto">{/* 0-przetwarzana, 1-przyjęty, 2-odrzucona, 3-anulowana */}
                      {status.map((val, index) => (<option value={index}>{val}</option>))}
                    </Form.Select></p>
                  </Form>
                </Col>
              </Row>
            </Modal.Body>
            {
              isLoggedIn ?
                <Modal.Footer>
                  {currentUserValue().type == 1 ? ( recruitment.status != 3 ?
                    <Button variant="primary" onClick={resign} disabled={disableForm}>
                      Rezyguj
                    </Button> : null ) :
                    <Button type="submit" form="recruitmentForm" variant="primary" disabled={disableForm}>
                      Zapisz zmiany
                    </Button>}
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

