import { defineConfig } from 'tsup';

export default defineConfig({
	entry: ['src/index.ts'],
	format: ['esm', 'cjs'],
	clean: true,
	dts: true,
	banner: () => {
		return { js: '"use client";' };
	},
    injectStyle: true,
	cjsInterop: true
});
