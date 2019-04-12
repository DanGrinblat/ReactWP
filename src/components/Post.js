import "./PostList.css";
import React from "react";

class Post extends React.Component {
	render() {
		const { title, imageLink } = this.props.post;
		return (
			<div>
				<img src={imageLink} alt="" style={{ width: "300px" }} />
				<div>{title.rendered}</div>
			</div>
		);
	}
}

export default Post;
