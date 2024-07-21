import type { StorybookConfig } from "@storybook/react-vite";

//Solve issue with node modules re-importing stories
export const resolveStories = (paths: Array<string>) => {
	const stories: StorybookConfig["stories"] = [];

	for (const story of paths) {
		stories.push(`../../../${story}/**/stories/*.stories.@(js|jsx|tsx)`);
	}

	return stories;
};
