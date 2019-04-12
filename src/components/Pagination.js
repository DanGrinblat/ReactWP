import "./Pagination.css";
import React from "react";

class Pagination extends React.Component {
	onClickPageHelper = event => {
		console.log(event);
		this.props.onClickPage(event.target.id);
	};

	renderPageButtons() {
		const pageNumbers = [];
		var pageButtons = [];

		for (var i = 1; i <= this.props.pageCount; i++) {
			pageNumbers.push(i);
		}

		pageButtons = pageNumbers.map(number => {
			return (
				<a
					key={number}
					id={number}
					className={`item ${
						this.props.selectedPage === number ? "active" : ""
					}`}
					onClick={this.onClickPageHelper}
				>
					{number}
				</a>
			);
		});

		return pageButtons;
	}

	render() {
		return (
			<div className="ui pagination menu">{this.renderPageButtons()}</div>
		);
	}
}

export default Pagination;
