import { useEffect, useState } from "react";
import '../scss/Header.scss';
import MainLogo from "../images/Logo.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons';

const Header = () => {
    return (
        <div>
            <div className="navBar">
            <div className="mainLogo">
                <img src={MainLogo} alt="" />
            </div>
            <div className="searchBar">
                <input type="text" placeholder="Search"/>
            </div>
            <div className="navigateButtons">
                <a href=""><FontAwesomeIcon icon={faHome} /></a>
                <a href=""></a>
                <a href=""></a>
            </div>
            </div>
        </div>
    )
}

export default Header;