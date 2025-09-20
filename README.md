# Mondi & Mona Adventures

React + Vite site deployed to **GitHub Pages**.

## Local Dev
```
npm install
npm run dev
```

## Production Build
```
npm run build
npm run preview
```

## Deployment
Deployment is automatic via GitHub Actions on every push to `main`.

Workflow: `.github/workflows/deploy.yml`

Vite `base` is set in `vite.config.js` to `/mondiandmona/` so assets resolve correctly at:
```
https://<your-username>.github.io/mondiandmona/
```

If you fork/rename:
1. Update `base` in `vite.config.js` to `/<new-repo-name>/` (or `'/'` for a user/organization root page repo named `<user>.github.io`).
2. Push a commit to trigger the workflow.

## Customize
Global HTML: `index.html`
Entry: `src/main.jsx`
App Root: `src/App.jsx`
Components: `src/components/*`
Styles: `src/index.css` (Tailwind enabled)

## Lint
```
npm run lint
```

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- GitHub Pages (Actions deploy)

---
Feel free to add more content & sections as the project grows.
