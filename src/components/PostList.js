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
				<div key={post.id} className="equal width column">
					<center>
						<Post post={post} />
					</center>
				</div>
			);
		});
	}

	render() {
		return (
			<div className="ui container three column doubling stackable middle aligned centered grid post-list">
				{this.renderList()}
			</div>
		);
	}
}

export default PostList;
