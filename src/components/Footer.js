//Brand Logo, Footer Menu
import "./Footer.css";
import React from "react";
import logo from "../images/logo.png";

const Footer = () => {
	return (
		<div className="ui footer">
			<img className="footerLogo" src={logo} alt="Logo" />
		</div>
	);
};

export default Footer;
