import { defineConfig, loadEnv } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import fs from 'fs';

export default defineConfig(({mode}) => {
    const env = loadEnv(mode, process.cwd(), '');

    // PRODUCTION MODE
    if (env.APP_ENV === 'production' || 1) {
        return { plugins: [
            laravel({
                input: ['resources/app.jsx'],
                refresh: true,
            }),
            react()
        ]};
    }

    // DEVELOPMENT MODE
    return {
        server: {
            https: {
                key: fs.readFileSync(env.HTTPS_KEY),
                cert: fs.readFileSync(env.HTTPS_CERT)
            }
        },
        plugins: [
            laravel({
                input: ['resources/app.jsx'],
                refresh: true,
            }),
            react()
        ]
    }
});
