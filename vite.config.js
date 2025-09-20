/* eslint-env node */
/* eslint-env node */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Auto-detect hosting:
// - On GitHub Actions (for GitHub Pages), use "/mondiandmona/"
// - Locally/Netlify, use "/" (site served from root)
// Detect CI safely in both Node and ESM contexts
// Only treat GitHub Actions as GitHub Pages deploy context.
// Netlify also sets CI=true, so don't use that signal.
const isGitHubActions = globalThis?.process?.env?.GITHUB_ACTIONS === 'true';
const base = isGitHubActions ? '/mondiandmona/' : '/';

export default defineConfig({
  base,
  plugins: [react()],
});
