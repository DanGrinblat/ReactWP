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
	const props = { params: { categoryterm: "category" } };

	beforeEach(() => {
		mockAxios.reset();
		blogHome = shallow(<BlogHome match={props} />);
	});

	it("retrieves posts, media, and categories with axios", async () => {
		blogHome.instance().retrieveAll(1, 6);
		let categoriesResponse = [{ id: 1, slug: "category" }];
		let postsResponse = [{ post: { featured_media: "1" } }];
		let requestInfo = mockAxios.lastReqGet();
		mockAxios.mockResponse(categoriesResponse);
		//retrievePosts should call now but doesn't in the test since we're not individually calling the requests
	});

	it("retrieves posts with axios with categories", async () => {
		const categories = [{ id: 1, slug: "category" }];
		blogHome.instance().retrievePosts(1, 6, categories);
		let responseObj = { data: [{ test: "test" }] };
		let requestInfo = mockAxios.lastReqGet();
		mockAxios.mockResponse(responseObj, requestInfo);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/posts", {
			params: {
				page: 1,
				per_page: 6,
				categories: [1]
			}
		});
	});

	it("retrieving posts with axios with a nonexisting category should return empty array", async () => {
		const categories = [{ id: 1, slug: "nonexisting" }];
		expect(
			blogHome.instance().retrievePosts(1, 6, categories)
		).resolves.toEqual([]);
	});

	it("retrieves media with axios", async () => {
		blogHome.instance().retrieveMedia([1, 2, 3]);
		let responseObj = { data: [{ test: "test" }] };
		let requestInfo = mockAxios.lastReqGet();
		mockAxios.mockResponse(responseObj, requestInfo);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/media", {
			params: { include: [1, 2, 3] }
		});
	});

	it("retrieves media with axios where the state is the same as the response", async () => {
		const makeCall = function(responseObj) {
			blogHome.instance().retrieveMedia([1, 2, 3]);
			let requestInfo = mockAxios.lastReqGet();
			mockAxios.mockResponse(responseObj, requestInfo);
		};

		let responseObj = { data: [{ test: "test" }] };
		makeCall(responseObj);
		makeCall(responseObj);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/media", {
			params: { include: [1, 2, 3] }
		});
	});

	it("retrieves categories with axios", async () => {
		blogHome.instance().retrieveCategories();
		let responseObj = { data: [{ test: "test" }] };
		let requestInfo = mockAxios.lastReqGet();
		mockAxios.mockResponse(responseObj, requestInfo);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/categories");
	});

	it("retrieves categories with axios where the state is the same as the response", async () => {
		const makeCall = function(responseObj) {
			blogHome.instance().retrieveCategories();
			let requestInfo = mockAxios.lastReqGet();
			mockAxios.mockResponse(responseObj, requestInfo);
		};
		let responseObj = { data: [{ test: "test" }] };

		makeCall(responseObj);
		makeCall(responseObj);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/categories");
	});
});

describe("branch API requests", () => {
	beforeEach(() => {
		mockAxios.reset();
	});

	it("retrieves posts with axios with categoryterm set as null", async () => {
		const props = { params: { categoryterm: null } };
		const blogHome = shallow(<BlogHome match={props} />);

		blogHome.instance().retrievePosts(1, 6, []);
		let responseObj = { data: [{ test: "test" }] };
		mockAxios.mockResponse(responseObj);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/posts", {
			params: {
				page: 1,
				per_page: 6
			}
		});
	});

	it("retrieves posts with axios with categoryterm set as null where state is the same as the response", async () => {
		const props = { params: { categoryterm: null } };
		const blogHome = shallow(<BlogHome match={props} />);

		const makeCall = function(responseObj) {
			blogHome.instance().retrievePosts(1, 6, []);
			let requestInfo = mockAxios.lastReqGet();
			mockAxios.mockResponse(responseObj, requestInfo);
		};
		let responseObj = { data: [{ test: "test" }] };

		makeCall(responseObj);
		makeCall(responseObj);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/posts", {
			params: {
				page: 1,
				per_page: 6
			}
		});
	});
});
