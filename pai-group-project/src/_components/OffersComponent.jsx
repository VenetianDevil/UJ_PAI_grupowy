import React, { useState } from 'react';
import "../_styles/loader.css";
import { Table } from 'react-bootstrap';
import OfferModalComponent from './OfferModalComponent';
import useModal from '../_services/useModal';
import { LoaderComponent } from './LoaderComponent';

function OffersComponent(props) {

  const [modal, openModal, closeModal] = useModal("OfferModalComponent");
  const [companyId, setCompanyId] = useState(props.companyId);
  const [jobOffers, setJobOffers] = useState([{
    ID: 0,
    companyId: 0,
    companyName: "Super company",
    title: "Super stanowisko",
    address: "Karmelicka 20/90, Kraków",
    categories: [3, 4, 5],
    workMode: "pełen etet",
    remote: "zdalna",
    info: "Jakiś opis oferty. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    officialOfferUrl: "https://nofluffjobs.com/pl/job/remote-senior-ruby-on-rails-developer-htd-health-2bk4dw09",
    endDate: "10-07-2022",
  }, {
    ID: 1,
    companyId: 0,
    companyName: "Super company",
    title: "Super stanowisko",
    address: "Karmelicka 20/90, Kraków",
    categories: [3, 4, 5],
    workMode: "pełen etet",
    remote: "zdalna",
    info: "Jakiś opis oferty. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    officialOfferUrl: "https://nofluffjobs.com/pl/job/remote-senior-ruby-on-rails-developer-htd-health-2bk4dw09",
    endDate: "10-07-2022",
  }]);
  const [offer] = useState();

  if(!jobOffers){
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
            <th>Koniec rekrutacji</th>
          </tr>
        </thead>
        <tbody>
          {jobOffers.map(offer => <tr className="pointer" key={offer.ID} onClick={() => openModal(offer)}>
            <td>{offer.ID}</td>
            <td>{offer.title}</td>
            <td>{offer.companyName}</td>
            <td>{offer.workMode}</td>
            <td>{offer.remote}</td>
            <td>{offer.endDate}</td>
          </tr>)}
        </tbody>
      </Table>
      {modal.show ? <OfferModalComponent modal={modal} callback={closeModal}></OfferModalComponent> : null }

    </div>
  );
}

export default OffersComponent;
