import React from "react";
import { shallow, mount } from "enzyme";
import { Route } from "react-router";
import BlogHome from "./BlogHome";
import mockAxios from "jest-mock-axios";
import PostList from "./PostList";

jest.mock("axios");

describe("BlogHome", () => {
	const blogHome = shallow(<BlogHome />);

	it("should render correctly", () => {
		expect(blogHome).toMatchSnapshot();
	});

	it("initializes `state`", () => {
		expect(blogHome.state()).toEqual({
			posts: [],
			media: [],
			categories: [],
			pageCount: 1,
			postCount: 0,
			postsPerPage: 6,
			selectedPage: 1
		});
	});

	describe("when clicking a page", () => {
		it("calls retrieve all", () => {
			blogHome.instance().onClickPage(1);
			expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/categories");
		});
	});
});

describe("API requests", () => {
	let blogHome;
	const props = { params: { categoryterm: null } };

	beforeEach(() => {
		mockAxios.reset();
		blogHome = mount(<BlogHome match={props} />);
	});

	it("retrieves posts with axios", async () => {
		blogHome.instance().retrievePosts(1, 6, []);
		let responseObj = { data: [3, 2, 1] };
		mockAxios.mockResponse(responseObj);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/posts", {
			params: {
				page: 1,
				per_page: 6
			}
		});
	});

	it("retrieves media with axios", async () => {
		blogHome.instance().retrieveMedia([1, 2, 3]);
		let responseObj = { data: [3, 2, 1] };
		mockAxios.mockResponse(responseObj);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/media", {
			params: { include: [1, 2, 3] }
		});
	});

	it("retrieves categories with axios", async () => {
		blogHome.instance().retrieveCategories();
		let responseObj = { data: [1, 2, 3] };
		mockAxios.mockResponse(responseObj);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/categories");
	});
});
