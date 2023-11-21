import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	clean: true,
	dts: true,
	minify: true,
	banner: () => {
		return { js: '"use client";' };
	},
    injectStyle: true,
	cjsInterop: true
});
