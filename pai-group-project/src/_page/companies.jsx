import React, { useEffect, useState } from 'react';
import { LoaderComponent } from '../_components/LoaderComponent';
import { Row, Button, Col } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
import useCompanies from '../_services/useCompanies';

function Companies() {

  const [isLoading, setLoading] = useState(true);
  const { getAllCompanies } = useCompanies();
  const [companies, setComapnies] = useState([]);

  useEffect(() => {
    if (isLoading) {
      getAllCompanies()
        .then((data) => {
          if (!!data.companies) {
            setComapnies(data.comapnies);
          }
          setLoading(false);
        })
        .catch(error => {
          setComapnies([{
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
        <h2 className='my-4'>Firmy</h2>
        <Row>
          {companies.map(company =>
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
    </div>
  )
}

export default Companies;
