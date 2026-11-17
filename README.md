# akku-rawat.github.io

My portfolio: a pixel-art Himalayan valley (night in dark mode, sunrise in light mode), a short About card, three selected projects and two side projects, a "Work with me" section with contact details, a résumé download, and light and dark themes.

Live at **https://akku-rawat.github.io**

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | The page |
| `assets/css/style.css` | Styles |
| `assets/js/main.js` | The hero scene and the other pixel art, theme toggle, scroll fade-ups and the copy-email button |
| `Akhilesh_Rawat_Resume.pdf` | The résumé the site links to |
| `404.html` | Page for links that go nowhere |
| `favicon.svg`, `favicon.png`, `apple-touch-icon.png` | Icons |
| `assets/og.png` | Preview image for links shared on LinkedIn and elsewhere |

No build step and no dependencies. GitHub Pages serves the files as they are.

## Run it locally

```bash
npm run dev
```

This just runs `python3 -m http.server 4000`; there are no packages to install.

Then open http://localhost:4000.

## Keeping it fresh

- **Résumé:** replace `Akhilesh_Rawat_Resume.pdf` with the new file, keeping the name.
- **Work:** the three selected projects are `<article class="tile work">` cards and the side projects are `<article class="tile side">` cards in `index.html`. Everything else lives in the résumé.
- **Services and availability:** the `#services` section in `index.html`.
