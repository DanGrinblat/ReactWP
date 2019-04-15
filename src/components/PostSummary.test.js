import React from "react";
import { shallow } from "enzyme";
import PostSummary from "./PostSummary";

describe("PostSummary", () => {
	const post = {
		featured_media: null,
		imageLink: null,
		title: { rendered: "title" },
		excerpt: { rendered: "excerpt" }
	};

	const postSummary = shallow(<PostSummary post={post} />);

	it("should render correctly", () => {
		expect(postSummary).toMatchSnapshot();
	});

	describe("truncation method", () => {
		it("should trim a string to the last whole word and add ellipses", () => {
			expect(postSummary.instance().truncate("test string", 6)).toEqual(
				"test ..."
			);
		});

		it("should return the string if its length is less than the specified length", () => {
			expect(postSummary.instance().truncate("test string", 20)).toEqual(
				"test string"
			);
		});
	});

	describe("strip method", () => {
		it("should remove all html tags from a string", () => {
			const sampleTest = "<div>test</div>";
			expect(postSummary.instance().strip(sampleTest)).toEqual("test");
		});

		it("should return an empty string if it receives an empty string", () => {
			expect(postSummary.instance().strip("")).toEqual("");
		});
	});
});
