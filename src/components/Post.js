import "./PostList.css";
import React from "react";

class Post extends React.Component {
	//Remove all HTML tags
	strip(html) {
		var tmp = document.createElement("div");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	}

	truncate = (string, maxLength) => {
		if (string.length < maxLength) {
			return string;
		}
		//Trim the string to the maximum length
		var truncatedString = string.substr(0, maxLength);

		//Re-trim if we are in the middle of a word
		truncatedString = truncatedString.substr(
			0,
			Math.min(truncatedString.length, truncatedString.lastIndexOf(" "))
		);
		return truncatedString + " ...";
	};

	render() {
		const { title, excerpt, imageLink } = this.props.post;
		var excerptFormatted = this.strip(excerpt.rendered);
		excerptFormatted = this.truncate(excerptFormatted, 100);

		return (
			<div>
				<img src={imageLink} alt="" style={{ width: "300px" }} />
				<div>
					<b>{title.rendered}</b>
				</div>
				<div>{excerptFormatted}</div>
			</div>
		);
	}
}

export default Post;
