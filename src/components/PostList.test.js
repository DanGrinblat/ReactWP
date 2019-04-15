import React from "react";
import { shallow } from "enzyme";
import PostList from "./PostList";

describe("PostList", () => {
	const posts = [
		{
			id: 1,
			featured_media: "2",
			imageLink: null,
			title: "title",
			excerpt: { rendered: "excerpt" }
		}
	];

	const media = [{ id: "2", source_url: "linktest" }];

	const postList = shallow(<PostList media={media} posts={posts} />);

	it("should render correctly", () => {
		expect(postList).toMatchSnapshot();
	});

	it("should set post.imagLink to media.source_url if the post featured_media id matches the media id", () => {
		const imageLinkProp = postList.instance().props.posts[0].imageLink;
		const sourceUrlProp = postList.instance().props.media[0].source_url;
		expect(imageLinkProp).toEqual(sourceUrlProp);
	});
});

describe("branch PostList", () => {
	const posts = [
		{
			id: 1,
			featured_media: "2",
			imageLink: null,
			title: "title",
			excerpt: { rendered: "excerpt" }
		}
	];

	const media = [{ id: "3", source_url: "linktest" }];

	const postList = shallow(<PostList media={media} posts={posts} />);

	it("should still render if there is no matching media", () => {
		expect(postList).toMatchSnapshot();
	});
});
