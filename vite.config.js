// Plugins
import vue from '@vitejs/plugin-vue'
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { terser } from 'rollup-plugin-terser';
import css from 'rollup-plugin-css-only';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // Set this to 'production' to enable minification
    mode: 'production',

    // Customize the Rollup build options
    rollupOptions: {
      plugins: [
        // Minify JavaScript
        terser(),

        // Minify CSS
        css({ output: 'bundle.css' }),
      ],
    },
  },
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  test: {
    global: true,
    environment: 'jsdom',
    deps: {
      inline: ['vuetify'],
    },
  },
  server: {
    port: 3000,
  },
})
