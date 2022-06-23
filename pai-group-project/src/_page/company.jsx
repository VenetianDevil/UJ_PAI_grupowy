import React, { useEffect, useState } from 'react';
import { LoaderComponent } from '../_components/LoaderComponent';
import useAuth from '../_services/useAuth';
import { Row, Button, Col } from 'react-bootstrap';
import { Link, useParams } from "react-router-dom";

function Company() {
  const { id } = useParams();

  console.log(id);

  const company = {
    ID: 0,
    name: "Oferta 0",
  };

  return (
    <div>
      <section>
        <h2 className='my-4'>{company.name}</h2>
      </section>
    </div>
  )
}

export default Company;
