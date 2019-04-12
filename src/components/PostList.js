import "./PostList";
import React from "react";
import Post from "./Post";

class PostList extends React.Component {
	renderList() {
		return this.props.posts.map(post => {
			for (var i in this.props.media) {
				if (post.featured_media === this.props.media[i].id) {
					post.imageLink = this.props.media[i].source_url;
				}
			}

			return (
				<div key={post.id} className="equal width centered column">
					<Post post={post} />
				</div>
			);
		});
	}

	render() {
		return (
			<div className="ui container three column doubling stackable middle aligned centered grid">
				{this.renderList()}
			</div>
		);
	}
}

export default PostList;
