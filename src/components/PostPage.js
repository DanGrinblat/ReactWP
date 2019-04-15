//Single - Display post with full content
import "./PostPage.css";
import React from "react";
import axios from "../api/axios";

class PostPage extends React.Component {
	state = { post: [] };

	async retrievePostBySlug(postSlug) {
		const response = await axios.get("wp/v2/posts", {
			params: { slug: postSlug }
		});

		if (this.state.post !== response.data) {
			this.setState({ post: response.data });
		}

		return response.data;
	}

	componentDidMount() {
		this.retrievePostBySlug(this.props.match.params.postslug);
	}

	//Using dangerouslySetInnerHTML for demo purposes only
	render() {
		if (this.state.post.length === 0) {
			return <div />;
		}

		const { title, content } = this.state.post[0];
		return (
			<div className="post-page">
				<h1 className="ui header">{title.rendered}</h1>
				<div dangerouslySetInnerHTML={{ __html: content.rendered }} />
			</div>
		);
	}
}

export default PostPage;
