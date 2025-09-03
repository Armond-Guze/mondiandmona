import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// For GitHub Pages project site deployment, set base to "/<repo-name>/".
// This ensures built asset paths work at https://<user>.github.io/mondiandmona/
export default defineConfig({
  base: '/mondiandmona/',
  plugins: [react()],
});
