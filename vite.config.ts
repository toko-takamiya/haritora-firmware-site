import { paraglideVitePlugin } from '@inlang/paraglide-js';
import tailwindcss from '@tailwindcss/vite';
import devtoolsJson from 'vite-plugin-devtools-json';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { execSync } from 'child_process';
import fs from 'fs';

const commitHash = execSync('git rev-parse --short HEAD').toString().trim();

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		devtoolsJson(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ["globalVariable", "preferredLanguage", "baseLocale"]
		})
	],
	define: {
		__APP_VERSION__: JSON.stringify(process.env.npm_package_version),
		__COMMIT_HASH__: JSON.stringify(commitHash)
	},
	server: {
		https: {
			key: fs.readFileSync('./localhost-key.pem'),
			cert: fs.readFileSync('./localhost.pem')
		}
	}
});
