//Single - Display post with full content
import "./PostPage.css";
import React from "react";
import wprest from "../api/wprest";

class PostPage extends React.Component {
	state = { post: [] };

	async retrievePostBySlug(postSlug) {
		const response = await wprest.get("wp/v2/posts/", {
			params: { slug: postSlug }
		});
		console.log(response);
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
		if (this.state.post.length == 0) {
			return <div />;
		}
		console.log(this.state.post);
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
