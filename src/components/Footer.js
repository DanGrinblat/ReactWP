//Brand Logo, Footer Menu
import "./Footer.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo-footer.png";

const Footer = () => {
	return (
		<div className="footer">
			<Link to="/" className="footer-inline-block">
				<img className="footerLogo" src={logo} alt="Logo" />
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
};

export default Footer;
