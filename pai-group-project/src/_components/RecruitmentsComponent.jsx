import React, { useEffect, useState } from 'react';
import "../_styles/loader.css";
import { Table } from 'react-bootstrap';
import RecruitmentModalComponent from './RecruitmentModalComponent';
import useModal from '../_services/useModal';
import { LoaderComponent } from './LoaderComponent';
import useUsers from '../_services/useUsers';
import useCompanies from '../_services/useCompanies';
import useAuth from '../_services/useAuth';
import useOffers from '../_services/useOffers';
import NotificationManager from 'react-notifications/lib/NotificationManager';
import { format } from 'date-fns'
var _ = require('lodash');

function RecruitmentsComponent() {

  const { currentUserValue } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [modal, openModal, closeModal] = useModal("RecruitmentModalComponent");
  const [recruitments, setRecruitments] = useState();
  const { getUserRecruitments } = useUsers();
  const { getCompanyRecruitments } = useCompanies();
  const { stages, status } = useOffers();

  useEffect(() => {
    if (isLoading && !!currentUserValue()) {
      const request = currentUserValue().type == 1 ? getUserRecruitments : getCompanyRecruitments;
      request(currentUserValue().id)
        .then((data) => {
          if (!!data) {
            setRecruitments(data);
          }
          setLoading(false);
        })
        .catch(error => {
          NotificationManager.error("Nie udało sie pobrać danych", "Error!");
          setLoading(false);
        })

    }
  }, [isLoading])

  if (!!isLoading) {
    <LoaderComponent></LoaderComponent>
  }

  return (
    <div>
      <h2>Rekrutacje</h2>
      <Table striped bordered hover responsive="sm" className="">
        <thead>
          <tr>
            <th>#</th>
            <th>#Oferta</th>
            <th>Nazwa stanowiska</th>
            <th>Kandydat</th>
            <th>Firma</th>
            <th title="0-złożona, 1-przyjęta, 2-W trakcie kwalifikacji, 3-Rozpatrzona">Etap</th>{/* etapy rekrutacji 0-złożona, 1-przyjęta, 2-W trakcie kwalifikacji, 3-Rozpatrzona */}
            <th title="0-przetwarzana, 1-przyjęta, 2-odrzucona, 3-anulowana">Status</th>{/* 0-przetwarzana, 1-przyjęta, 2-odrzucona, 3-anulowana */}
            <th>Data złożenia</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (<tr><td colSpan={8}><LoaderComponent></LoaderComponent></td></tr>) :
          (!_.isEmpty(recruitments) ? recruitments.map(recruitment => <tr className="pointer" key={recruitment.RecruitmentID} onClick={() => openModal(recruitment)}>
            <td>{recruitment.RecruitmentID}</td>
            <td>{recruitment.offerID}</td>
            <td>{recruitment.title}</td>
            <td>Jan Kowalski</td>
            <td>{recruitment.companyName}</td>
            <td>{recruitment.stage ? stages[recruitment.stage] : "-"}</td>
            <td>{recruitment.status ? status[recruitment.status] : "-"}</td>
            <td>{format(new Date(recruitment.updatedAt), 'dd/MM/yyyy')}</td>
          </tr>) : <tr><td colSpan={8}>Brak rekrutacji</td></tr>)}
        </tbody>
      </Table>
      {modal.show ? <RecruitmentModalComponent modal={modal} callback={closeModal}></RecruitmentModalComponent> : null}

    </div>
  );
}

export default RecruitmentsComponent;
