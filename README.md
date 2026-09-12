# LifePointe Ministries — Community Website Demo

A demo redesign of [lifepointeministries.org](https://www.lifepointeministries.org) — a church in Titusville, FL, meeting at the Titusville Civic Center.

Built to show pastors and church leaders a warmer, clearer, more useful web presence for helping people in the community find the church, get help, and get involved.

## What's in this repo

```
.
├── index.html          # Home — hero, service times, CREW 29, give, contact
├── about.html          # About — mission, beliefs, Pastor Royce bio
├── crew29.html         # CREW 29 Outreach — what we do, when, volunteer
├── give.html           # Giving — why, how, offline options
├── serve.html          # Get involved — volunteer roles, next steps
├── visit.html          # Plan your visit — what to expect, FAQ
├── css/
│   └── style.css       # Shared styles (CSS variables, mobile-first)
├── js/
│   └── main.js         # Mobile menu, small interactions
├── images/
│   └── README.md       # Image sourcing notes (logos, photos)
├── data/
│   └── site.json       # One place for phone/address/hours — easy to edit
├── .gitignore
└── README.md
```

## Why this design

Grounded in church-website best practices (see `references/`):

- **Mobile-first, responsive.** Most visitors arrive on a phone.
- **Clear audience paths.** "I'm new", "I need help", "I want to serve" — each has a visible next step.
- **Service times and location above the fold.** No hunt for the basics.
- **One phone number, one address, one email** in `data/site.json` — change once, everywhere.
- **CREW 29 Outreach gets its own page** with schedule, what to bring, and a volunteer interest form.
- **Offline giving options shown** (checks, in-person) alongside online giving — not everyone gives online.
- **Accessibility-first:** semantic HTML, color contrast, focus styles, skip link, ARIA where it helps.
- **SEO / local discovery:** meta tags, Open Graph, and `LocalBusiness`/`Organization` structured data.
- **No tracking, no dependencies.** Static HTML you can host anywhere — Cloudflare Pages, Netlify, shared hosting, a church laptop.

## Honest limitations

- **Content is demo copy** drawn from the live site — pastor quotes, service times, and contact details need verification with the church before publishing.
- **Images are placeholdrs.** The church's real photos (with permission) make or break a church site — this repo flags where they go.
- **Online giving link** points at the existing BreezeChMS form; the demo keeps that flow but makes the path clearer.
- **No backend.** Forms are demo-only (mailto/placeholder). A real deploy needs a form handler — email service, Formspree, Cloudflare Workers, etc.

## How to demo

Open `index.html` directly in a browser, or serve statically:

```bash
cd /path/to/this/repo
python3 -m http.server 8080
# then open http://localhost:8080
```

For a shareable deploy, push to a GitHub repo and connect to Cloudflare Pages (the framework the douglaspc.com site already uses) or Netlify — both give HTTPS and a live URL for free.

## Suggested next steps with the church

1. **Verify facts** — service times, address, phone, email, giving account info, CREW 29 schedule.
2. **Collect real photos** — worship space, community meals, CREW 29 in action, the Civic Center, Pastor Royce (with consent).
3. **Pick a host** — Cloudflare Pages is the lightest path if they're already in that ecosystem; otherwise Netlify or any static host.
4. **Connect a real form handler** for volunteer interest and "I need help" requests so they actually reach someone.
5. **Add a sermons/media plan** — even a simple YouTube embed list or a Breeze sermon feed beats a dead "media" link.
6. **Local SEO** — claim/verify a Google Business Profile for LifePointe Ministries at the Civic Center address, consistent NAP (name/address/phone) everywhere.

## References

- `references/church-website-best-practices.md` — the principles behind the design, with source links.
