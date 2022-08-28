import React, { useEffect, useState } from 'react';
import "../_styles/loader.css";
import { Table } from 'react-bootstrap';
import OfferModalComponent from './OfferModalComponent';
import useModal from '../_services/useModal';
import { LoaderComponent } from './LoaderComponent';
import useCompanies from '../_services/useCompanies';
import useOffers from '../_services/useOffers';
import NotificationManager from 'react-notifications/lib/NotificationManager';
var _ = require('lodash');

function OffersComponent(props) {
  const [isLoading, setLoading] = useState(true);
  const { getCompanyOffers } = useCompanies();
  const [modal, openModal, closeModal] = useModal("OfferModalComponent");
  const [companyID, setCompanyId] = useState(props.companyID);
  const [jobOffers, setJobOffers] = useState([]);
  const { workModes, remoteStates } = useOffers();

  useEffect(() => {
    if (isLoading) {
      getCompanyOffers(companyID)
        .then((data) => {
          if (!!data) {
            setJobOffers(data);
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
      <h2>Oferty</h2>
      <Table striped bordered hover responsive="sm" className="">
        <thead>
          <tr>
            <th>#</th>
            <th>Nazwa stanowiska</th>
            <th>Firma</th>
            <th>Etat</th>{/* półetatu, etat */}
            <th>Tryb</th>{/* zdalna / stacjonarna */}
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (<tr><td colSpan={8}><LoaderComponent></LoaderComponent></td></tr>) :
            (!_.isEmpty(jobOffers) ? jobOffers.map(offer => <tr className="pointer" key={offer.offerID} onClick={() => openModal(offer)}>
              <td>{offer.offerID}</td>
              <td>{offer.title}</td>
              <td>{offer.companyName}</td>
              <td>{offer.workMode ? workModes[offer.workMode-1] : "-"}</td>
              <td>{offer.remote ? remoteStates[offer.remote-1] : "-"}</td>
              <td>{_.truncate(offer.offerInfo, {'length': 50})}</td>
            </tr>) : <tr><td colSpan={8}>Brak ofert</td></tr>)}
        </tbody>
      </Table>
      {modal.show ? <OfferModalComponent modal={modal} callback={closeModal}></OfferModalComponent> : null}

    </div>
  );
}

export default OffersComponent;
