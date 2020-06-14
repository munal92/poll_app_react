import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../img/Logo.svg";
import PollAppTxt from "../img/PollApp.svg";
const NavigBar = () => {
  return (
    <header>
      <Navbar className="navbar-expand-lg px-md-5 mx-md-5">
        <Navbar.Brand href="#home">
          <img alt="" src={Logo} className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Brand href="#home">
          <img alt="" src={PollAppTxt} className="d-inline-block align-top" />{" "}
        </Navbar.Brand>
      </Navbar>
    </header>
  );
};

export default NavigBar;
