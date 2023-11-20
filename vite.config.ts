import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			formats: ['es', 'cjs'],
			fileName: 'index',
		},
		sourcemap: 'hidden',
		rollupOptions: {
			external: ['react', 'react/jsx-runtime'],
			output: {
				banner: "'use client';",
				interop: 'auto',
				globals: { react: 'React' },
			},
		},
	},
	plugins: [react(), dts({ rollupTypes: true })],
});
