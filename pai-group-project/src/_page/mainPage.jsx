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

function MainPage() {
  const [modal, openModal, closeModal] = useModal("OfferModalComponent");
  const { getBestCompanies } = useCompanies();
  const { getBestOffers } = useOffers();
  const [isLoading, setLoading] = useState(true);
  const [companies, setCompanies] = useState();
  const [jobOffers, setJobOffers] = useState();

  useEffect(() => {
    if (isLoading) {
      if (!!companies && !!jobOffers) {
        setLoading(false);
      } else {
        getBestCompanies()
          .then((data) => {
            if (!!data.companies) {
              setCompanies(data.comapnies);
            }
          })
          .catch(error => {
            setCompanies([{
              ID: 0,
              name: "Firma 0",
            }, {
              ID: 1,
              name: "Firma 1",
            }, {
              ID: 2,
              name: "Firma 2",
            }, {
              ID: 3,
              name: "Firma 3",
            }, {
              ID: 4,
              name: "Firma 4",
            }, {
              ID: 5,
              name: "Firma 5",
            },
            ])
            NotificationManager.error("Nie udało sie pobrać danych", "Error!");
          });

        getBestOffers()
          .then((data) => {
            if (!!data.offers) {
              setJobOffers(data.offers);
            }
          })
          .catch(error => {
            setJobOffers([{
              ID: 0,
              title: "Oferta 0",
            }, {
              ID: 1,
              title: "Oferta 1",
            }, {
              ID: 2,
              title: "Oferta 2",
            }, {
              ID: 3,
              title: "Oferta 3",
            }, {
              ID: 4,
              title: "Oferta 4",
            }, {
              ID: 5,
              title: "Oferta 5",
            },
            ])
            NotificationManager.error("Nie udało sie pobrać danych", "Error!");
          });

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
              <div className='card jobOffer-card' key={offer.ID}>
                <h3>{offer.title}</h3>
                <p>Nazwa firmy</p>
                <Button onClick={() => openModal(offer)}>Zobacz</Button>
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
              <div className='card company-card' key={company.ID}>
                <h3>{company.name}</h3>
                <p>Kraków</p>
                <Link to={`/profil/${company.ID}`}><Button>Zobacz</Button></Link>
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
