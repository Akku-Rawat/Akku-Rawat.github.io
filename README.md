# akku-rawat.github.io

My portfolio: a small pixel observatory under a Starry Night sky, with my work, skills and side projects, a "Work with me" section for freelance clients, a résumé download and a terminal you can type into.

Live at **https://akku-rawat.github.io**

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | The page |
| `assets/css/style.css` | Styles |
| `assets/js/main.js` | The sky, pool table, mobile menu and the shell |
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
- **Work:** the three case studies are `<article class="entry">` cards and the rest are `<li class="proj">` rows in `index.html`. The terminal builds its files from them, so editing one updates `cat work/<project>.md` too.
- **Services and availability:** the `#services` section in `index.html`.
