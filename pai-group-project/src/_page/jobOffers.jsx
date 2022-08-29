import React, { useEffect, useState } from 'react';
import { LoaderComponent } from '../_components/LoaderComponent';
import { Row, Button, Col } from 'react-bootstrap';
import useModal from '../_services/useModal';
import OfferModalComponent from '../_components/OfferModalComponent';
import useOffers from '../_services/useOffers';
import { NotificationManager } from 'react-notifications';

function JobOffers() {

  const [isLoading, setLoading] = useState(true);
  const [modal, openModal, closeModal] = useModal("OfferModalComponent");
  const { getAllOffer } = useOffers();
  const [jobOffers, setJobOffers] = useState([]);

  useEffect(() => {
    if (isLoading) {
      getAllOffer()
        .then((data) => {
          if (!!data) {
            setJobOffers(data);
          }
          setLoading(false);
        })
        .catch(error => {
          // setJobOffers([{
          //   ID: 0,
          //   title: "Oferta 0",
          // }, {
          //   ID: 1,
          //   title: "Oferta 1",
          // }, {
          //   ID: 2,
          //   title: "Oferta 2",
          // }, {
          //   ID: 3,
          //   title: "Oferta 3",
          // }, {
          //   ID: 4,
          //   title: "Oferta 4",
          // }, {
          //   ID: 5,
          //   title: "Oferta 5",
          // },
          // ])
          NotificationManager.error("Nie udało sie pobrać danych", "Error!");
          setLoading(false);
        })
    }
  }, [isLoading])

  if(!!isLoading){
    return (<LoaderComponent></LoaderComponent>)
  }

  return (
    <div>
      <section>
        <h2 className='my-4'>Oferty</h2>
        <Row>
          {jobOffers.map(offer =>
            <Col xs={12} sm={6} lg={3} className="mb-3">
              <div className='card jobOffer-card' key={offer.offerID}>
                <h3>{offer.title}</h3>
                <p>{offer.companyName}</p>
                <Button id="jobOffer" onClick={() => openModal(offer)}>Zobacz</Button>
              </div>
            </Col>
          )}
        </Row>
      </section>
      {modal.show ? <OfferModalComponent modal={modal} callback={closeModal}></OfferModalComponent> : null}

    </div>
  )
}

export default JobOffers;
