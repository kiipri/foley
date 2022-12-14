import withTM from 'next-transpile-modules';
import { dirname, join } from 'path';
import { envVars } from './src/env/server.mjs';

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
	return config;
}

export default withTM(['@clfxc/ui', '@clfxc/services', '@clfxc/db'])(
	defineNextConfig({
		distDir: join(dirname('.'), '.next'),
		reactStrictMode: true,
		env: envVars,
		// i18n: {
		// 	locales: ['en'],
		// 	defaultLocale: 'en',
		// },
		images: {
			domains: ['firebasestorage.googleapis.com'],
		},
		sassOptions: {
			includePaths: [join(dirname('.'), 'src', 'styles')],
		},
		webpack(config) {
			config.resolve = {
				...config.resolve,
				fallback: {
					fs: false,
					path: false,
					os: false,
				},
			};

			return config;
		},
		// redirects() {
		// return [
		// {
		// 	source: '/',
		// 	destination: '/dashboard',
		// 	permanent: true,
		// },
		// ];
		// },
	})
);
