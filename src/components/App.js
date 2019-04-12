import "./App.css";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BlogHome from "./BlogHome";
import SinglePost from "./SinglePost";
import { Router, Route } from "react-router-dom";
import history from "./history";

class App extends React.Component {
	render() {
		return (
			<div style={{ height: "100vh" }}>
				<Header />
				<Router history={history}>
					<Route path="/" exact component={BlogHome} />
					<Route
						path="/category/:categoryterm"
						exact
						component={BlogHome}
					/>
					<Route
						path="/blog/:postname"
						exact
						component={SinglePost}
					/>
				</Router>
				<Footer />
			</div>
		);
	}
}

export default App;

//Home - Should Display Latest # Posts ( Title and excerpt only ) with pagination
