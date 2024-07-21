import { resolveStories } from "../helper";

export const storiesConfig = resolveStories(["packages", "web"]);

export const previewConfig = {
	api: "http://localhost:4000",
};
