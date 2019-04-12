import "./BlogHome.css";
import React from "react";
import PostList from "./PostList";
import Pagination from "./Pagination";
import wprest from "../api/wprest";

class BlogHome extends React.Component {
	state = {
		posts: [],
		media: [],
		categories: [],
		pageCount: 1,
		postCount: 0,
		postsPerPage: 6,
		selectedPage: 1
	};

	componentDidMount() {
		this.retrievePosts(this.state.selectedPage, this.state.postsPerPage);
	}

	onClickPage = newPage => {
		this.setState({
			selectedPage: Number(newPage)
		});
		this.retrievePosts(newPage, this.state.postsPerPage);
	};

	//Retrieve Posts followed by the media required by each post
	retrievePosts = async (page, perPage) => {
		console.log(page);
		const response = await wprest.get("wp/v2/posts", {
			params: { page: page, per_page: perPage }
		});

		const postIdsList = response.data.map(post => {
			return post.featured_media;
		});

		this.setState({
			posts: response.data,
			postCount: response.headers["x-wp-total"],
			pageCount: response.headers["x-wp-totalpages"]
		});
		console.log(response);
		this.retrieveMedia(postIdsList);
	};

	async retrieveMedia(postIdsList) {
		const response = await wprest.get("wp/v2/media", {
			params: { include: postIdsList }
		});

		this.setState({ media: response.data });
	}

	render() {
		return (
			<div>
				<PostList posts={this.state.posts} media={this.state.media} />
				<center>
					<Pagination
						selectedPage={this.state.selectedPage}
						pageCount={this.state.pageCount}
						postCount={this.state.postCount}
						onClickPage={this.onClickPage}
					/>
				</center>
			</div>
		);
	}
}

export default BlogHome;
