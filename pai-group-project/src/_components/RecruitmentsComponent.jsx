import React, { useEffect, useState } from 'react';
import "../_styles/loader.css";
import { Table } from 'react-bootstrap';
import RecruitmentModalComponent from './RecruitmentModalComponent';
import useModal from '../_services/useModal';
import { LoaderComponent } from './LoaderComponent';
import useUsers from '../_services/useUsers';
import useCompanies from '../_services/useCompanies';
import useAuth from '../_services/useAuth';
import NotificationManager from 'react-notifications/lib/NotificationManager';
var _ = require('lodash');

function RecruitmentsComponent() {

  const { currentUserValue } = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [modal, openModal, closeModal] = useModal("RecruitmentModalComponent");
  const [recruitments, setRecruitments] = useState();
  const { getUserRecruitments } = useUsers();
  const { getCompanyRecruitments } = useCompanies();

  useEffect(() => {
    if (isLoading) { // && !!currentUserValue()
      // const request = currentUserValue().type == 1 ? getUserRecruitments : getCompanyRecruitments;
      const request = getUserRecruitments;
      request(0) //currentUserValue().id
        .then((data) => {
          if (!!data.user) {
            setRecruitments(data.recruitments);
          }
          setLoading(false);
        })
        .catch(error => {
          setRecruitments([{
            ID: 0,
            offerID: 0,
            companyId: 0,
            companyName: "Super company",
            title: "Super stanowisko",
            address: "Karmelicka 20/90, Kraków",
            stage: 1,
            status: 3,
            info: "Jakiś opis oferty. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            officialOfferUrl: "https://nofluffjobs.com/pl/job/remote-senior-ruby-on-rails-developer-htd-health-2bk4dw09",
            date: "10-07-2022",
          }, {
            ID: 1,
            offerID: 0,
            companyId: 0,
            companyName: "Super company",
            title: "Super stanowisko",
            address: "Karmelicka 20/90, Kraków",
            stage: 1,
            status: 3,
            info: "Jakiś opis oferty. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            officialOfferUrl: "https://nofluffjobs.com/pl/job/remote-senior-ruby-on-rails-developer-htd-health-2bk4dw09",
            date: "10-07-2022",
          }])
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
          (!_.isEmpty(recruitments) ? recruitments.map(recruitment => <tr className="pointer" key={recruitment.ID} onClick={() => openModal(recruitment)}>
            <td>{recruitment.ID}</td>
            <td>{recruitment.offerID}</td>
            <td>{recruitment.title}</td>
            <td>Jan Kowalski</td>
            <td>{recruitment.companyName}</td>
            <td>{recruitment.stage}</td>
            <td>{recruitment.status}</td>
            <td>{recruitment.date}</td>
          </tr>) : <tr><td colSpan={8}>Brak rekrutacji</td></tr>)}
        </tbody>
      </Table>
      {modal.show ? <RecruitmentModalComponent modal={modal} callback={closeModal}></RecruitmentModalComponent> : null}

    </div>
  );
}

export default RecruitmentsComponent;
