import React, { useEffect, useState } from 'react';
import { LoaderComponent } from '../_components/LoaderComponent';
import useAuth from '../_services/useAuth';
import { Row, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";

function JobOffers() {

  const jobOffers = [{
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
  ]

  return (
    <div>
      <section>
        <h2 className='my-4'>Oferty</h2>
        <Row>
          {jobOffers.map(offer =>
            <Col xs={12} sm={6} lg={3} className="mb-3">
              <div className='card jobOffer-card' key={offer.ID}>
                <h3>{offer.title}</h3>
                <p>Nazwa firmy</p>
                <Link to={`/oferta/${offer.ID}`}><Button>Zobacz</Button></Link>
              </div>
            </Col>
          )}
        </Row>
      </section>
    </div>
  )
}

export default JobOffers;
