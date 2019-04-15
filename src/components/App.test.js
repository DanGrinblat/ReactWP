import React from "react";
import { shallow } from "enzyme";
import { Route } from "react-router";
import BlogHome from "./BlogHome";
import App from "./App";

describe("App", () => {
	const app = shallow(<App />);

	it("should render correctly", () => {
		expect(app).toMatchSnapshot();
	});

	describe("when creating Routes", () => {
		let pathMap;

		beforeEach(() => {
			pathMap = app.find(Route).reduce((pathMap, route) => {
				const routeProps = route.props();
				pathMap[routeProps.path] = routeProps;
				return pathMap;
			}, {});
		});

		it("should create a Route to BlogHome", () => {
			expect(pathMap["/"].component).toBe(BlogHome);
		});

		it("should create a Route to BlogHome with URL param `test` set as key", () => {
			const props = { match: { params: { categoryterm: "test" } } };

			const blogHomeWrapper = shallow(
				pathMap["/category/:categoryterm"].render(props)
			);

			expect(
				blogHomeWrapper.instance().props.match.params.categoryterm
			).toEqual("test");
		});
	});
});
