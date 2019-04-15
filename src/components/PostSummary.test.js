import React from "react";
import { shallow } from "enzyme";
import PostSummary from "./PostSummary";

describe("PostSummary", () => {
	const post = {
		featured_media: null,
		imageLink: null,
		title: "title",
		excerpt: { rendered: "excerpt" }
	};

	const postSummary = shallow(<PostSummary post={post} />);

	it("should render correctly", () => {
		expect(postSummary).toMatchSnapshot();
	});
});
