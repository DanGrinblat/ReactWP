import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import BlogHome from "./BlogHome";
import SinglePost from "./SinglePost";
import { Router, Route } from "react-router-dom";
import history from "./history";

class App extends React.Component {
	/* 
	   When the User clicks on a new Page or Category, new API calls are made.
	   This is ideal for a real-world blog where new posts can be added while a user is browsing the webpage,
	   and where the total amount of posts is too large to retrieve/store at once.
	*/
	render() {
		return (
			<div style={{ height: "100vh" }}>
				<Router history={history}>
					<Header />
					<Route path="/" exact component={BlogHome} />
					<Route
						path="/category/:categoryterm"
						exact
						render={props => (
							<BlogHome
								key={props.match.params.categoryterm}
								{...props}
							/>
						)}
					/>
					<Route
						path="/blog/:postname"
						exact
						component={SinglePost}
					/>
					<Footer />
				</Router>
			</div>
		);
	}
}

export default App;

//Home - Should Display Latest # Posts ( Title and excerpt only ) with pagination
