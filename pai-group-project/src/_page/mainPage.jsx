import React, { useEffect, useState } from 'react';
import { LoaderComponent } from '../_components/LoaderComponent';
import useAuth from '../_services/useAuth';
import { Row, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import useModal from '../_services/useModal';
import OfferModalComponent from '../_components/OfferModalComponent';
import useCompanies from '../_services/useCompanies';
import useOffers from '../_services/useOffers';
import NotificationManager from 'react-notifications/lib/NotificationManager';
var _ = require('lodash');

function MainPage() {
  const [modal, openModal, closeModal] = useModal("OfferModalComponent");
  const { getBestCompanies } = useCompanies();
  const { getBestOffers } = useOffers();
  const [isLoading, setLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobOffers, setJobOffers] = useState([]);

  useEffect(() => {
    if (isLoading) {
      if (!_.isEmpty(companies) && !_.isEmpty(jobOffers)) {
        setLoading(false);
      } else {
        if (_.isEmpty(companies)) {
          getBestCompanies()
          .then((data) => {
              if (!!data) {
                setCompanies(data);
              }
            })
            .catch(error => {
              setLoading(false);
              NotificationManager.error("Nie udało sie pobrać danych", "Error!");
            });
        }

        if (_.isEmpty(jobOffers)) {
          getBestOffers()
            .then((data) => {
              if (data) {
                setJobOffers(data);
              }
            })
            .catch(error => {
              setLoading(false);
              NotificationManager.error("Nie udało sie pobrać danych", "Error!");
            });
        }
      }
    }
  })

  if (isLoading) {
    return (<LoaderComponent></LoaderComponent>)
  }

  return (
    <div>
      <section>
        <h2 className='my-4'>Najnowsze oferty</h2>
        <Row>
          {jobOffers.slice(0, 4).map(offer =>
            <Col xs={12} sm={6} lg={3} className="mb-3">
              <div className='card jobOffer-card' key={offer.offerID}>
                <h3>{offer.title}</h3>
                <p>{offer.companyName || "-NK-"}</p>
                <Button id="jobOffer" onClick={() => openModal(offer)}>Zobacz</Button>
              </div>
            </Col>
          )}
        </Row>
      </section>
      <section>
        <h2 className='my-4'>Najbardziej aktywne firmy</h2>
        <Row>
          {companies.slice(0, 4).map(company =>
            <Col xs={12} sm={6} lg={3} className="mb-3">
              <div className='card company-card' key={company.companyID}>
                <h3>{company.companyName || "-NK-"}</h3>
                <p>{company.HQLocation || "lokalizacja -nk-"}</p>
                <Link to={`/profil/${company.companyID}`}><Button id="jobOffer">Zobacz</Button></Link>
              </div>
            </Col>
          )}
        </Row>
      </section>
      {modal.show ? <OfferModalComponent modal={modal} callback={closeModal}></OfferModalComponent> : null}

    </div>
  )
}

export default MainPage;
