import { useEffect, useState } from "react";
import '../scss/Header.scss';
import MainLogo from "../images/Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faArrowCircleUp, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Container } from "react-bootstrap";

const Header = () => {
    return (
        <Container>
            <div className="navBar">
                <div className="mainLogo">
                    <img src={MainLogo} alt="" />
                </div>
                <div className="searchBar">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="navigateButtons">
                    <a href=""><FontAwesomeIcon icon={faHome} /></a>
                    <a href=""><FontAwesomeIcon icon={faArrowCircleUp} /></a>
                    <a href=""><FontAwesomeIcon icon={faUserCircle} /></a>
                </div>
            </div>
        </Container>
    )
}

export default Header;