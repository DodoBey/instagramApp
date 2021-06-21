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
            <FontAwesomeIcon className="navIcons" icon={faHome} />
            <FontAwesomeIcon
              className="navIcons"
              onClick={() => setModalShow(true)}
              icon={faArrowCircleUp}
            />
            <FontAwesomeIcon className="navIcons" icon={faUserCircle} />
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
        <Post setModalShow={setModalShow} />
      </Modal>
    </>
  );
};

export default Header;
