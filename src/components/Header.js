import "./Header.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

class Header extends React.Component {
	//Hardcoded Categories for demo
	render() {
		return (
			<div className="header sticky">
				<Link to="/" className="headerLogo inline-block">
					<img src={logo} alt="Logo" />
				</Link>

				<Link to="/category/blog">
					<div className="menuItem">Blog</div>
				</Link>
				<Link to="/category/business">
					<div className="menuItem">Business</div>
				</Link>
				<Link to="/category/news">
					<div className="menuItem">News</div>
				</Link>
				<Link to="/category/tech">
					<div className="menuItem">Tech</div>
				</Link>
				<Link to="/category/misc">
					<div className="menuItem">Misc</div>
				</Link>
			</div>
		);
	}
}

export default Header;
