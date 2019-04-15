import React from "react";
import { shallow, mount } from "enzyme";
import PostPage from "./PostPage";
import mockAxios from "jest-mock-axios";

describe("PostPage", () => {
	const props = { params: { postslug: null } };
	const postPage = shallow(<PostPage match={props} />);

	it("should render correctly", () => {
		expect(postPage).toMatchSnapshot();
	});
});

describe("API requests", () => {
	let blogHome;
	const props = { params: { postslug: "testslug" } };

	beforeEach(() => {
		mockAxios.reset();
		blogHome = mount(<PostPage match={props} />);
	});

	it("retrieves posts by slug with axios", async () => {
		blogHome.instance().retrievePostBySlug("testslug");
		let responseObj = {
			data: [
				{
					title: { rendered: "title" },
					content: { rendered: "content" }
				}
			]
		};
		mockAxios.mockResponse(responseObj);

		expect(mockAxios.get).toHaveBeenCalledWith("wp/v2/posts", {
			params: {
				slug: "testslug"
			}
		});
	});
});
