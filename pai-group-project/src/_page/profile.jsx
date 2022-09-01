import React, { useEffect, useState } from 'react';
import { LoaderComponent } from '../_components/LoaderComponent';
import useAuth from '../_services/useAuth';
import { Row, Col, Button } from 'react-bootstrap';
import { FaInstagram, FaGitSquare, FaGlobe, FaLinkedin, FaFilePdf, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import OffersComponent from '../_components/OffersComponent';
import useUsers from '../_services/useUsers';
import { useParams } from "react-router-dom";
import { NotificationManager } from 'react-notifications';
var _ = require('lodash');

function Profile() {
  const { id } = useParams();
  const { getUser } = useUsers();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (isLoading) {
      getUser(id)
        .then((data) => {
          if (!!data) {
            setUser(data);
          }
          setLoading(false);
        })
        .catch(error => {
          // setUser({
          //   ID: 0,
          //   type: 2,
          //   email: "dnaod@google.com",
          //   imageURL: "https://st2.depositphotos.com/1009634/7235/v/450/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
          //   givenName: "Tomek", // user
          //   familyName: "Kowalski", // user
          //   phoneNumber: "123456789", // user
          //   companyName: "Moja super firma", // company 
          //   HQLocation: "Kraków", // company
          //   info: "Jakiś opis profilu. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          //   linkedIn: "https://www.linkedin.com/?trk=seo-authwall-base_nav-header-logo",
          //   instagram: "https://www.instagram.com/",
          //   gitHub: "https://gitHub.com/", // user
          //   portfolioURL: "https://www.instagram.com/", // user
          //   cvURL: "https://api.ngo.pl/media/get/108219",
          //   companyURL: "https://www.ibm.com/pl-pl" // company
          // })
          NotificationManager.error("Nie udało sie pobrać danych", "Error!");
          setLoading(false);
        })

    }
  }, [isLoading])

  if (!!isLoading) {
    return (<LoaderComponent></LoaderComponent>)
  }

  return (
    <div>
      <section className='mb-5'>
        <Row>
          <h2 className='my-4 text-start d-block d-md-none'>{user.type == 1 ? user.givenName + " " + user.familyName : user.companyName}</h2>

          <Col xs={{ span: 12, order: 2 }} md={{ order: 1, span: 8 }} >
            <h2 className='my-4 text-start d-none d-md-block'>{user.type == 1 ? user.givenName + " " + user.familyName : user.companyName}</h2>
            {user.type == 2 && user.companyURL ? <a href={user.companyURL}><FaGlobe />&nbsp;Strona oficjalna<br /></a> : null}
            {user.type == 1 && user.portfolioURL ? <a href={user.portfolioURL}><FaGlobe />&nbsp;Prtfolio<br /></a> : null}
            {!_.isEmpty(user.instagram) ? <a href={user.instagram}><FaInstagram />&nbsp;Instagram<br /></a> : null}
            {!_.isEmpty(user.linkedIn) ? <a href={user.linkedIn}><FaLinkedin />&nbsp;LinkedIn<br /></a> : null}
            {user.type == 1 && user.gitHub != "" ? <a href={user.gitHub}><FaGitSquare />&nbsp;GitHub<br /></a> : null}
            <h3>Info</h3>
            {user.info ? <p className='mt-4'>{user.info}</p> : null}
          </Col>
          <Col xs={{ order: 1, span: 12 }} md={{ order: 2, span: 4 }}>
            <div className='mb-3'>
              <img src={user.imageURL ? user.imageURL : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} className="img-thumbnail" style={{ maxWidth: "300px", width: "100%" }}></img><br /><br />
              {user.type == 2 && user.HQLocation ? <p>{user.HQLocation}<br /></p> : null}
              {user.type == 1 && user.cvURL ? <a href={user.cvURL} target="_blank"><FaFilePdf />&nbsp;CV pdf<br /></a> : null}
              {user.email ? <a href={`mailto: ${user.email}`}><FaEnvelope />&nbsp;{user.email}<br /></a> : null}
              {user.phoneNumber ? <a href={`tel: ${user.phoneNumber}`}><FaPhoneAlt />&nbsp;{user.phoneNumber}<br /></a> : null}
            </div>
          </Col>
        </Row>

      </section>
      {user.type == 2 ?
        <section>
          <OffersComponent companyID={user.id}></OffersComponent>

        </section>
        : null
      }
    </div>
  )
}

export default Profile;
