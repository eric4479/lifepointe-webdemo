# LifePointe Ministries — Community Website Demo

A professional, open-source church website redesign for LifePointe Ministries in Titusville, FL. Built with free tools and deployed on Cloudflare Pages (free tier).

## Quick view — the key improvements over the current site

| Current | This demo |
|---|---|
| Single flat page, brown theme | Multi-page, charcoal + warm-accent, cinematic hero |
| No clear audience paths | Three visible routes: "I'm new", "I need help", "I want to serve" |
| CREW 29 buried at bottom | CREW 29 has its own page + homepage showcase |
| "Donate" button mislabeled | "Give Online" properly aligned in the nav |
| No mobile menu | Responsive mobile navigation with hamburger toggle |
| Wix site (closed source) | Static HTML/CSS/JS — yours forever |
| No local SEO / structured data | Schema.org Church markup, OG tags, meta |
| No Bible integration | YouVersion verse-of-the-day block |
| No QR | Placeholder for QR codes (giving, volunteer) |

## Demo

**Live at:** https://lifepointe-webdemo.pages.dev

Open `index.html` locally too:
```bash
python3 -m http.server 8080
# http://localhost:8080
```

## Stack — all free

- **HTML / CSS / vanilla JS** — no build tools, no npm dependencies, no CMS subscription
- **Cloudflare Pages** — free static hosting (custom domain later)
- **Google Fonts** (Inter, Playfair Display) — free
- **Pixabay** — CC0 cinematic video backgrounds, photos
- **SVG icons** — hand-coded, no external library
- **MIT license** on all code

### Optional power-ups (free tiers)

| Need | Free tool |
|---|---|
| Form handling | [Formspree](https://formspree.io/) (free 50/month) |
| Church management | [ChurchCMS](https://www.churchcms.app) — MIT, self-hosted, includes website/app/giving |
| Bible API | [YouVersion Platform](https://platform.youversion.com) — free Bible API (requires beta signup) |
| QR codes | [nayuki/QR-Code-generator](https://github.com/nayuki/QR-Code-generator) — MIT |
| Image optimization | Cloudflare Polished Images (free tier) |

> **Note:** Currently integrates with the existing **Breeze/Tithely** giving page at `https://lifepointe.breezechms.com/give/online`. Breeze → Tithely integration is configured inside Tithely (not on the website side) — see [Tithely Help: Breeze Integration](https://help.tithe.ly/hc/en-us/articles/6762475781783-Tithely-Giving-to-Breeze-ChMS-Integration).

## Project structure

```
.
├── index.html              # Cinematic hero + three audience paths + CREW 29 + contact
├── about.html              # About — mission, beliefs [TODO], Pastor Royce
├── crew29.html             # CREW 29 — schedule [TODO], volunteers, FAQ
├── give.html               # Giving — online / in-person / mail / QR
├── serve.html              # Volunteer — roles + interest form
├── visit.html              # Plan a visit — what to expect + FAQ
├── css/
│   └── style.css           # Charcoal + warm accent, mobile-first, accessible
├── js/
│   └── main.js             # Mobile menu + video lazy-load + helpers
├── images/                 # Logos, photos, heroes, QR codes (placeholder)
├── videos/
│   └── hero-drone.mp4      # Cinematic drone hero video (placeholder link)
├── .github/workflows/
│   └── deploy.yml          # Auto-deploy to Cloudflare Pages
├── wrangler.toml           # Cloudflare Pages config
├── package.json            # Repo metadata
└── README.md
```

## Color scheme

Replaced brown with a professional charcoal + warm orange palette:

| Role | Old (brown) | New (charcoal + accent) |
|---|---|---|
| Primary | Brown | Charcoal gray `#4A5568` |
| Accent | Lighter brown | Warm orange `#DD6B20` |
| Text | — | `#1A202C` dark |
| Background | — | Light gray `#F7FAFC` |

## Performance

- **Responsive images** with `loading="lazy"` and `fetchpriority`
- **Video lazy-loaded** only on desktop (saves mobile bandwidth)
- `prefers-reduced-motion` respected — video disabled for users who prefer reduced motion
- **Single CSS file**, single 4KB JS file
- Target **LCP < 2.5s** even on 3G — no render-blocking JS
- Cloudflare CDN caches everything globally

## What's still placeholder

| Page | Placeholder | Notes |
|---|---|---|
| Home hero | `/videos/hero-drone.mp4` | Free Pixabay CC0 drone video — church should replace with actual Titusville footage |
| `about.html` | Beliefs / statement of faith | Need church's actual statements |
| `crew29.html` | CREW 29 schedule (day/time) | Need actual schedule from the ministry |
| `visit.html` | Kids/family policy | Children's ministry details |
| All pages | Google Maps link | Currently `maps.app.goo.gl/PLACEHOLDER` |
| QR codes | `images/qr-*.png` | Placeholders — generate with the included QR code tool |
| Images | `/images/` placeholders | Add real photos with permission (see sources) |
| Forms | mailto drafts | Add Formspree endpoint or ChurchCMS backend |

## Adding QR codes (free)

```bash
npx -p @qr-code-generator/online npm install qrcode
# or use the browser-based nayuki/QR-Code-generator (MIT)
```

Generate QR codes for:
- Giving page: `https://lifepointe.breezechms.com/give/online`
- CREW 29 volunteer sign-up
- Google Maps directions

## Integrating YouVersion Bible API

1. Request beta access at https://platform.youversion.com
2. Replace the static verse block in `index.html` with a fetch to their API:
```js
fetch('https://api.youversion.com/v2/verses?reference=1+Corinthians+16:13&version=niv')
  .then(r => r.json())
  .then(data => { /* render verse */ });
```

## Integrating ChurchCMS

If the church wants to move off Breeze/Tithely entirely:
1. Install ChurchCMS (free, MIT) on a shared VPS or Docker
2. Their website builder + member directory + giving + mobile app replace the whole stack
3. The site can embed ChurchCMS's event API and giving widget
4. Data migration from Breeze is supported by ChurchCMS's setup service

## License

All code in this repo is **MIT**. Third-party assets (videos, fonts) are used under their respective CC0/free licenses — see each asset's source. The church can fork, host, and modify freely.

---

**Built with** ❤️ for LifePointe Ministries • Titusville, FL
