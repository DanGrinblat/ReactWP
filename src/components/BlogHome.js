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
		this.retrieveAll(this.state.selectedPage, this.state.postsPerPage);
	}

	onClickPage = newPage => {
		this.setState({
			selectedPage: Number(newPage)
		});
		this.retrieveAll(newPage, this.state.postsPerPage);
	};

	//Retrieve Categories, Posts, and Media in succession
	retrieveAll = async (page, perPage) => {
		const categoriesData = await this.retrieveCategories();
		const postsData = await this.retrievePosts(
			page,
			perPage,
			categoriesData
		);

		const postIdsList = postsData.map(post => {
			return post.featured_media;
		});
		await this.retrieveMedia(postIdsList);
	};

	retrievePosts = async (page, perPage, categories) => {
		var params = { page: page, per_page: perPage };

		const selectedCategory = this.props.match.params.categoryterm;
		if (selectedCategory != null) {
			var selectedCategoryExists = false;
			for (var i = 0; i < categories.length; i++) {
				if (selectedCategory === categories[i].slug) {
					params.categories = [categories[i].id];
					selectedCategoryExists = true;
					break;
				}
			}
			if (!selectedCategoryExists) {
				return [];
			}
		}

		const response = await wprest.get("wp/v2/posts", { params });
		console.log(response);

		if (this.state.posts !== response.data) {
			//If there are 0 pages, set pageCount to 1
			const newPageCount =
				response.headers["x-wp-totalpages"] !== "0"
					? response.headers["x-wp-totalpages"]
					: "1";
			this.setState({
				posts: response.data,
				postCount: response.headers["x-wp-total"],
				pageCount: newPageCount
			});
		}
		return response.data;
	};

	async retrieveMedia(postIdsList) {
		const response = await wprest.get("wp/v2/media", {
			params: { include: postIdsList }
		});

		if (this.state.media !== response.data) {
			this.setState({ media: response.data });
		}
		return response.data;
	}

	async retrieveCategories() {
		const response = await wprest.get("wp/v2/categories");
		if (this.state.categories !== response.data) {
			this.setState({ categories: response.data });
		}
		return response.data;
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
