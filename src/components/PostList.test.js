import React from "react";
import { shallow } from "enzyme";
import PostList from "./PostList";

describe("PostList", () => {
	const posts = [
		{
			id: 1,
			featured_media: null,
			imageLink: null,
			title: "title",
			excerpt: { rendered: "excerpt" }
		}
	];

	const postList = shallow(<PostList posts={posts} />);

	it("should render correctly", () => {
		expect(postList).toMatchSnapshot();
	});
});
