import { resolve } from 'path';
import fs from 'fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	publicDir: false,
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es', 'cjs'],
			fileName: 'index',
		},
		rollupOptions: {
			external: ['react', 'react/jsx-runtime'],
			output: {
				banner: "'use client';",
				interop: 'auto',
				inlineDynamicImports: true,
			},
		},
	},
	plugins: [
		react(),
		dts({
			rollupTypes: true,
			afterBuild: () => {
				fs.copyFileSync('dist/index.d.cts.d.ts', 'dist/index.d.cts');
				fs.copyFileSync('dist/index.d.cts.d.ts', 'dist/index.d.ts');
				fs.rmSync('dist/index.d.cts.d.ts');
			},
		}),
	],
});
