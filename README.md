# akku-rawat.github.io

My portfolio: a small pixel observatory under a Starry Night sky, with my experience, skills and side projects, a résumé download, a lo-fi radio and a terminal you can type into.

Live at **https://akku-rawat.github.io**

## What's here

| Path | What it is |
| --- | --- |
| `index.html` | The page |
| `assets/css/style.css` | Styles |
| `assets/js/main.js` | The sky, pool table, lo-fi radio and the shell |
| `Akhilesh_Rawat_Resume.pdf` | The résumé the site links to |
| `404.html` | Page for links that go nowhere |
| `favicon.svg`, `favicon.png`, `apple-touch-icon.png` | Icons |
| `assets/og.png` | Preview image for links shared on LinkedIn and elsewhere |

No build step and no dependencies. GitHub Pages serves the files as they are.

## Run it locally

```bash
python3 -m http.server 4000
```

Then open http://localhost:4000.

## Keeping it fresh

- **Now:** edit the `now-list` items in `index.html` and the `updated` date above them.
- **Résumé:** replace `Akhilesh_Rawat_Resume.pdf` with the new file, keeping the name.
- **Projects and experience:** each card is an `<article class="entry">` in `index.html`. The terminal builds its files from these cards, so editing a card updates `cat work/<project>.md` too.
