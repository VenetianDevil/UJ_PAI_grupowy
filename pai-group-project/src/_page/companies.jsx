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
          if (!!data) {
            setComapnies(data);
          }
          setLoading(false);
        })
        .catch(error => {
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
              <div className='card company-card' key={company.companyID}>
                <h3>{company.companyName || "-NK-"}</h3>
                <p>{company.HQLocation || "lokalizacja -nk-"}</p>
                <Link to={`/profil/${company.companyID}`}><Button>Zobacz</Button></Link>
              </div>
            </Col>
          )}
        </Row>
      </section>
    </div>
  )
}

export default Companies;
