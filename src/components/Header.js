import "./Header.css";
import React from "react";
import logo from "../images/logo.png";

class Header extends React.Component {
	render() {
		return (
			<div className="header sticky">
				<img className="headerLogo" src={logo} alt="Logo" />
			</div>
		);
	}
}

export default Header;
