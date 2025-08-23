

// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // ✅ Auto-open browser on start
    hmr: false,
  },
  // Add the css object to link Vite to your PostCSS configuration
  css: {
    postcss: './postcss.config.js',
  },
});












// // vite.config.js
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     open: true, // ✅ Auto-open browser on start
//     hmr: false,
//   },
// });

