import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import App from "../Layout";
import Home from "../pages/Home";
import Skills from "../pages/Skills";
import Certifications from "../pages/Certifications";
import Projects from "../pages/Projects";
import Contact from "../pages/Contact";

/* Pull Data From Global Routes Data File and add registered components to the 'element' property of each. */
const componentRegistry = {
	home: <Home />,
	skills: <Skills />,
	certs: <Certifications />,
	projects: <Projects />,
	contact: <Contact />
}

const injectElements = (routes) => {
	for (const r in routes) {
		routes[r].element = React.cloneElement(
			componentRegistry[r],
			{
				title: routes[r].title,
				description: routes[r].description,
				[routes[r].protected ? 'protected' : null]: routes[r].protected,
			}
		);
		if(routes[r].children) routes[r].children = injectElements(routes[r].children);
	}
	return Object.keys(routes).map(r => routes[r]);
}

export const routes = injectElements(routeData);

const routeConstructor = [
	{
		"path": "",
		"element": <App />,
		"errorElement": <NotFound />,
		"children": [
			...routes, //...Object.keys(routes).map(r => routes[r]),
		]
	},
	{
		path: "*",
		element: <NotFound />
	}
];
const router = createBrowserRouter(routeConstructor);
console.log("Routes", routes);

export default router;
