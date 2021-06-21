import { useEffect, useState } from "react";
import "../scss/Header.scss";
import MainLogo from "../images/Logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faArrowCircleUp,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { Container } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import Post from "./Post";
import { Link } from "react-router-dom";

const Header = () => {
    const [modalShow, setModalShow] = useState(false);
    const handleClose = () => setModalShow(false);
    
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
                        <Link to="/"><FontAwesomeIcon className="navIcons" icon={faHome} /></Link>
                        <FontAwesomeIcon className="navIcons" onClick={() => setModalShow(true)} icon={faArrowCircleUp} />
                        <Link to="/profile"><FontAwesomeIcon className="navIcons" icon={faUserCircle} /></Link>
                    </div>
                </div>
            </Container>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalShow}
                    onHide={handleClose}
                >
                    <Post />
                </Modal>
        </>
    )
};

export default Header;
