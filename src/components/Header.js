import { useEffect, useState } from "react";
import '../scss/Header.scss';
import MainLogo from "../images/Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faArrowCircleUp, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Container } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';
import Post from "./Post";

const Header = () => {
    const [modalShow, setModalShow] = useState(false);
    
    return (
        <>
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
                        <a href="" onClick={() => setModalShow(true)}><FontAwesomeIcon icon={faArrowCircleUp} /></a>
                        <a href=""><FontAwesomeIcon icon={faUserCircle} /></a>
                    </div>
                </div>
            </Container>
            <Container>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Post />
                </Modal>
            </Container>
        </>
    )
}

export default Header;