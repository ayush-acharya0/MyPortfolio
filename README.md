# Portfolio

My personal portfolio site. One page, built with plain **HTML, CSS and JavaScript**, no frameworks and no build step.

Everything on it is based on my GitHub profile: [github.com/ayush-acharya0](https://github.com/ayush-acharya0)

## Design

The UI borrows from [kolejain.com](https://www.kolejain.com): a sidebar nav, hairline strokes, **Fraunces** headings with **DM Sans** text and **IBM Plex Mono** labels. Projects sit in an [Aceternity](https://ui.aceternity.com)-style bento grid with a cursor-following spotlight inside each card, flat bordered cards, no drop shadows.

The light theme is a warm paper palette (`#F7F5F0 / #F1EEE7 / #E7E3D9` with `#DCD7CB` hairlines, none of it pure white). The dark theme sits on warm charcoal grays (`#161617 / #1E1E20 / #2A2A2C`).

## Features

- 🎯 Eyes on the hero avatar that follow your cursor (works on touch screens too)
- 🗂️ A filterable grid of my 6 pinned GitHub projects: All / Games / Tools
- 📌 Links to every repo, plus the live demo where one exists
- 🌗 Light / dark theme toggle, remembered in `localStorage`
- 📱 Responsive, with the sidebar collapsing into a floating top bar under 930px
- ✨ Scroll-reveal animations and scroll-spy nav highlighting
- ⌨️ Keyboard friendly: skip link, visible focus rings, and `prefers-reduced-motion` honored by the eyes, spotlight and reveals

## Pinned projects

| Project | Category | Live |
| --- | --- | --- |
| Bagh-Chal (Tigers & Goats) | Games | GitHub only |
| 9-11 Game | Games | [vercel](https://9-11-game.vercel.app) |
| ASCII Portrait Generator | Tools | [vercel](https://ascii-potrait-generator.vercel.app) |
| Password Generator | Tools | GitHub only |
| Game of Life | Games | [vercel](https://game-of-life-nu-ebon.vercel.app) |
| Rock · Paper · Scissors | Games | [vercel](https://rock-paper-scissors-mu-flame.vercel.app) |

## Running it locally

```sh
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` straight in a browser works too.

## Files

```
index.html          : sidebar nav + hero, about, projects, contact
style.css           : design tokens, layout, themes, animations
eyes.js             : the cursor-tracking pupils (parked under reduced motion)
script.js           : theme, menu, filters, spotlight, scroll effects
image.webp          : hero character illustration (672KB PNG down to 32KB WebP)
favicon.svg         : tab icon
apple-touch-icon.png: icon for phone home screens
og.png              : 1200x630 share card for link previews
```
