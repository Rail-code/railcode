import svgr from "vite-plugin-svgr";

import react from "@vitejs/plugin-react";

//Config
import { storiesConfig, previewConfig } from "../global/config";

//Types
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	stories: storiesConfig,
	addons: ["@storybook/addon-essentials"],
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	core: {
		builder: "@storybook/builder-vite", // 👈 The builder enabled here.
	},
	docs: {},
	typescript: {
		reactDocgen: false,
	},
	viteFinal: async (config, { configType }) => {
		const { mergeConfig } = await import("vite");

		return mergeConfig(config, {
			plugins: [react(), svgr({ include: "**/*.svg" })],
			esbuild: {
				jsx: "automatic",
			},
			/**
			 * Configure the Vite server proxy
			 */
			server: {
				proxy: {
					"/api": {
						target: previewConfig.api,
						changeOrigin: true,
						rewrite: (path: string) => path.replace(/^\/api/, ""),
					},
				},
			},
			build: {
				chunkSizeWarningLimit: 1000,
				rollupOptions: {
					/**
					 * Ignore "use client" warning since we are not using SSR
					 * @see {@link https://github.com/TanStack/query/pull/5161#issuecomment-1477389761 Preserve 'use client' directives TanStack/query#5161}
					 */
					onwarn(warning, warn) {
						if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
							return;
						}

						warn(warning);
					},
				},
			},
		});
	},
};

export default config;
