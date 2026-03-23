import { resolve } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'unplugin-dts/vite';

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: false,
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es', 'cjs'],
			fileName: 'index',
		},
		rolldownOptions: {
			external: ['react', 'react/jsx-runtime', 'classcat', 'use-sync-external-store/shim'],
			output: {
				banner: "'use client';",
				codeSplitting: false,
			},
			checks: {
				pluginTimings: false,
			},
		},
	},
	plugins: [
		react(),
		dts({
			bundleTypes: true,
			afterBuild: () => {
				fs.copyFileSync('dist/index.d.cts', 'dist/index.d.ts');
			},
		}),
	],
});
