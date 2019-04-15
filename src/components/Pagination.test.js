import React from "react";
import { shallow } from "enzyme";
import Pagination from "./Pagination";

describe("Pagination", () => {
	const mockOnClickPage = jest.fn();
	const props = {
		pageCount: 2,
		selectedPage: 1,
		onClickPage: mockOnClickPage
	};
	const pagination = shallow(<Pagination {...props} />);

	it("should render correctly", () => {
		expect(pagination).toMatchSnapshot();
	});

	describe("when clicking a page", () => {
		it("should call onClickPage in the props", () => {
			pagination
				.find(".item")
				.at(1)
				.simulate("click", { target: { value: 1 } });
			expect(mockOnClickPage).toHaveBeenCalled();
		});
	});
});
