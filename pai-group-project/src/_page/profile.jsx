import React, { useEffect, useState } from 'react';
import { LoaderComponent } from '../_components/LoaderComponent';
import useAuth from '../_services/useAuth';
import { Row, Col } from 'react-bootstrap';
import { FaInstagram, FaGitSquare, FaGlobe, FaLinkedin, FaFilePdf, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import OffersComponent from '../_components/OffersComponent';

function Profile() {

  const user = {
    ID: 0,
    type: 2,
    email: "dnaod@google.com",
    imageUrl: "https://st2.depositphotos.com/1009634/7235/v/450/depositphotos_72350117-stock-illustration-no-user-profile-picture-hand.jpg",
    givenName: "Tomek", // user
    familyName: "Kowalski", // user
    phoneNumber: "123456789", // user
    companyName: "Moja super firma", // company 
    hqLocation: "Kraków", // company
    info: "Jakiś opis profilu. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    linkedIn: "https://www.linkedin.com/?trk=seo-authwall-base_nav-header-logo",
    instagram: "https://www.instagram.com/",
    github: "https://github.com/", // user
    portfolioUrl: "https://www.instagram.com/", // user
    cvPdfUrl: "https://api.ngo.pl/media/get/108219",
    companyUrl: "https://www.ibm.com/pl-pl" // company
  }

  return (
    <div>
      <section className='mb-5'>
        <Row>
          <h2 className='my-4 text-start d-block d-md-none'>{user.type == 1 ? user.givenName + " " + user.familyName : user.companyName}</h2>
          <Col xs={{ span: 12, order: 2 }} md={{ order: 1, span: 8 }} >
            <h2 className='my-4 text-start d-none d-md-block'>{user.type == 1 ? user.givenName + " " + user.familyName : user.companyName}</h2>
            {user.type == 2 && user.companyUrl ? <a href={user.companyUrl}><FaGlobe />&nbsp;Strona oficjalna<br /></a> : null}
            {user.type == 1 && user.portfolioUrl ? <a href={user.portfolioUrl}><FaGlobe />&nbsp;Prtfolio<br /></a> : null}
            {user.instagram != "" ? <a href={user.instagram}><FaInstagram />&nbsp;Instagram<br /></a> : null}
            {user.linkedIn != "" ? <a href={user.linkedIn}><FaLinkedin />&nbsp;LinkedIn<br /></a> : null}
            {user.type == 1 && user.github != "" ? <a href={user.github}><FaGitSquare />&nbsp;Github<br /></a> : null}
            <h3>Info</h3>
            {user.info ? <p className='mt-4'>{user.info}</p> : null}
          </Col>
          <Col xs={{ order: 1, span: 12 }} md={{ order: 2, span: 4 }}>
            <div className='mb-3'>
              <img src={user.imageUrl ? user.imageUrl : "https://icon-library.com/images/no-user-image-icon/no-user-image-icon-3.jpg"} className="img-thumbnail" style={{ maxWidth: "300px", width: "100%" }}></img><br /><br />
              {user.type == 2 && user.hqLocation ? <p>{user.hqLocation}<br /></p> : null}
              {user.type == 1 && user.cvPdfUrl ? <a href={user.cvPdfUrl} target="_blank"><FaFilePdf />&nbsp;CV pdf<br /></a> : null}
              {user.email ? <a href={`mailto: ${user.email}`}><FaEnvelope />&nbsp;{user.email}<br /></a> : null}
              {user.email ? <a href={`tel: ${user.phoneNumber}`}><FaPhoneAlt />&nbsp;{user.phoneNumber}<br /></a> : null}
            </div>
          </Col>
        </Row>

      </section>
      {user.type == 2 ?
        <section>
          <OffersComponent></OffersComponent>

        </section>
        : null
      }
    </div>
  )
}

export default Profile;
