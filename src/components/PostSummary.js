import "./PostSummary.css";
import React from "react";

class PostSummary extends React.Component {
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
				<img src={imageLink} alt="" class="post-summary-image" />
				<div className="post-summary-text">
					<b>{title.rendered}</b>
					<div>{excerptFormatted}</div>
				</div>
			</div>
		);
	}
}

export default PostSummary;
