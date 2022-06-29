import React, { useEffect, useState } from 'react';
import "../_styles/loader.css";
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import useAuth from '../_services/useAuth';
import { LoaderComponent } from './LoaderComponent';
import useUsers from '../_services/useUsers';
import { NotificationManager } from 'react-notifications';

export default function RecruitmentModalComponent(props) {

  const modal = props.modal;
  const { isLoggedIn, currentUserValue } = useAuth();
  const { updateUserRecruitment } = useUsers();
  const { disable, setDisable } = useState(!!currentUserValue() && currentUserValue().type == 1); //modyfikacja niedostępna dla zwykłego użytkownika, tylko firmy
  const [ recruitment, setRecruitment ] = useState(modal.data);
  var callback = props.callback;

  function resign() {
    changeState(3);
    updateRecruitment();
  }

  function changeStage(val) {
    setRecruitment({ ...recruitment, stage: val })
  }


  function changeState(val) {
    setRecruitment({ ...recruitment, state: val })

  }

  function updateRecruitment() {
    updateUserRecruitment(recruitment.ID, { stage: recruitment.stage, state: recruitment.state })
      .then(data => {
        NotificationManager.success("Rekrutacja zaktializowana", "Sukces!");
      })
      .catch(error => {
        NotificationManager.error("Aktializacja nieudana", "Błąd!");

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
              <Modal.Title>#{recruitment.ID} {recruitment.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={12} >
                  <Form onSubmit={saveChanges} id="recruitmentForm">
                    <p><b>Firma:</b> {recruitment.companyName}</p>
                    <p><b>Kandydat:</b> Jan Kowalski</p>
                    <p><b>Koniec rekrutacji:</b> {recruitment.endDate}</p>
                    <p><b className="float-start">Etap:</b> <Form.Select defaultValue={recruitment.stage} disabled={disable} onChange={(e) => changeStage(e.target.value)} size="sm" className="w-auto">{/*0-złożona, 1-zaakceptwana, 2-W trakcie kwalifikacji, 3-Rozpatrzona*/}
                      <option value="0">złożona</option>
                      <option value="1">zaakceptwana</option>
                      <option value="2">rozpatrywana</option>
                      <option value="3">zakończona</option>
                    </Form.Select></p>
                    <p><b className="float-start">Status:</b> <Form.Select defaultValue={recruitment.status} disabled={disable} onChange={(e) => changeState(e.target.value)} size="sm" className="w-auto">{/* 0-przetwarzana, 1-przyjęty, 2-odrzucona, 3-anulowana */}
                      <option value="0">przetwarzana</option>
                      <option value="1">przyjęty</option>
                      <option value="2">odrzucony</option>
                      <option value="3">anulowane</option>
                    </Form.Select></p>
                  </Form>
                </Col>

              </Row>
            </Modal.Body>
            {
              isLoggedIn ?
                <Modal.Footer>
                  {currentUserValue().type == 1 ?
                    <Button variant="primary" onClick={resign}>
                      Rezyguj
                    </Button> :
                    <Button type="submit" form="recruitmentForm" variant="primary">
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

