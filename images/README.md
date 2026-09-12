# Images — sourcing notes for LifePointe Ministries demo site

This folder is intentionally empty of real images. The HTML references a
few placeholder spots where real photos would make the site work. Fill them
only with images the church controls or has permission to use.

## What's referenced and where

- `images/logo.png` — brand mark, used in structured data (`og:image` is separate).
- `images/og-home.jpg` — Open Graph share image for the home page.
- `images/og-about.jpg`, `images/og-crew29.jpg`, etc. — per-page share images (optional but nice).

Placeholders in the HTML (search `placeholder-img` or `[Photo:`) flag the spots.

## What makes a church site's photos work

- Real photos of the actual ministry — worship space, the Civic Center, community meals, CREW 29 outings — beat stock every time.
- Get written permission for anyone recognizable in a photo, especially minors. When in doubt, photograph hands, backs, crowd scenes, or spaces rather than faces.
- A small set of strong vertical and horizontal shots covers most placements: hero, about, CREW 29, visit. Start with 5–8 good ones.
- Compress before deploying (squoosh.app, ImageOptim, or a build step). Keep hero images under ~150KB and in-page photos under ~50KB where you can.

## Where to get images (server-side, no client secrets)

1. **Existing church photos.** The fastest, most authentic source. Ask Pastor Royce or whoever keeps phone photos of outings and meals.
2. **Civic Center photos.** The venue may have press/high-res photos the church can use — ask the Civic Center contact.
3. **Take new ones.** A phone on a sunny morning inside the worship space, at a community meal, and during a CREW 29 outing is often enough to start.

## Logo

- If LifePointe has an existing logo (PNG/SVG), use that.
- If not, a simple typographic mark (the "LifePointe" wordmark in the brand color) is fine to start — see the CSS `brand` rules.

## Do NOT use

- Random stock photos of people who don't look like the community the church serves.
- Images from other organizations (other churches, Breeze, venue bloggers) without permission.
- Photos pulled from social media without confirming the person in them consents.
