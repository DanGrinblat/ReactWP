import "./PostList.css";
import React from "react";

class Post extends React.Component {
	strip(html) {
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	}

	truncate = (string, maxLength) => {
		if (string.length < maxLength) {
			return string;
		}
		//trim the string to the maximum length
		var truncatedString = string.substr(0, maxLength);

		//re-trim if we are in the middle of a word
		truncatedString = truncatedString.substr(
			0,
			Math.min(truncatedString.length, truncatedString.lastIndexOf(" "))
		);
		return truncatedString + " ...";
	};

	render() {
		const { title, excerpt, imageLink } = this.props.post;

		var excerptStripped = this.strip(excerpt.rendered);
		excerptStripped = this.truncate(excerptStripped, 100);

		return (
			<div>
				<img src={imageLink} alt="" style={{ width: "300px" }} />
				<div>
					<b>{title.rendered}</b>
				</div>
				<div>{excerptStripped}</div>
			</div>
		);
	}
}

export default Post;
