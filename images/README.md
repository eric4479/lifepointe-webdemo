# LifePointe Ministries — Image & Video Asset Guide

This directory is deliberately empty of real photos. The HTML references placeholders where
real images and a hero video would go. Below are **legal, free sources** for the church to use.

## Assets referenced in the HTML

| File | Where used | Source |
|---|---|---|
| `/images/logo.svg` | Header (all pages) | Generated — **replace with the church's actual logo** |
| `/images/logo-white.svg` | Footer (all pages) | Generated — **replace** |
| `/images/favicon.svg` | `<head>` favicon | Generated — **replace** |
| `/images/og-image.svg` | `<meta property="og:image">` | Generated — **replace** |
| `/images/civic-center-placeholder.jpg` | About → "Where we meet" | **Replace with real photo of Civic Center** |
| `/images/crew29-placeholder.jpg` | Home + CREW 29 showcase | **Replace with real CREW 29 photo** |
| `/videos/hero-drone.mp4` | Home page cinematic hero | **CC0 Pixabay video** — see below |

## Hero video (CC0 — free, no attribution required)

The hero `<video>` on `index.html` uses a lazy-loaded drone video. Source it from **Pixabay**
(free, royalty-free, CC0 — suitable for commercial & non-commercial use, no attribution required):

- **"Drone in the clouds flying over the river"** — `https://cdn.pixabay.com/video/2024/05/29/214268_tiny.mp4`
- **"Aerial view above a curvy road in Somerset England"** — `https://cdn.pixabay.com/video/2024/04/20/208744_large.mp4`
- **Church drone views** — `https://pixabay.com/videos/search/church%20drone%20view/`

Download a 15–30 second clip, keep it under 10MB (resize to 1280px wide, H.264, ~2–5 Mbps).
The `prefers-reduced-motion` CSS rule falls back to a static image on devices that disable motion.

## Free photo sources (CC0 — no attribution required)

| Site | What to search | Notes |
|---|---|---|
| [Pixabay](https://pixabay.com/images/search/) | "church interior", "community meal", "Titusville FL" | 10,000+ free church photos |
| [Pexels](https://pexels.com) | "church", "community", "volunteer", "worship" | High-res, no attribution needed |
| [Unsplash](https://unsplash.com) | "church", "worship", "community service" | Check license (usually free for commercial use) |
| [Church Visuals](https://churchvisuals.com) | Free worship backgrounds, ministry graphics | Christian-specific free resources |

## What NOT to use

- Photos from the church's social media posts (unless you have permission to use them)
- Stock image sites that require attribution you can't track
- Images of other churches or ministries without permission
- Anything watermarked or from Google Images without verifying the license

## For the church

The best photos are **the church's own** — Sunday worship, community meals, CREW 29 outings,
the Civic Center space, Pastor Royce in action. Ask the church office or volunteer coordinator
who holds the phone photos and get written permission to use them (a simple email saying
"I grant permission to use photos from LifePointe events for the website" is enough).

## QR codes

Generate free QR codes using the MIT-licensed `qrcode` npm package or browser:
```bash
npx qrcode "https://lifepointe.breezechms.com/give/online" --output images/qr-give.png
npx qrcode "https://maps.app.goo.gl/PLACEHOLDER" --output images/qr-directions.png
npx qrcode "https://lifepointe-webdemo.pages.dev/serve.html" --output images/qr-volunteer.png
```

Or use the browser-based nayuki/QR-Code-generator (MIT):
https://github.com/nayuki/QR-Code-generator
