interface ImportMetaEnv {
	readonly NODE_ENV: string;
	readonly VITE_API: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
