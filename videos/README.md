# LifePointe Ministries — Hero Video

This directory holds the cinematic hero video for the home page.

## Current state

`/videos/hero-drone.mp4` is a **placeholder path** — the HTML references it with lazy-loading
enabled only on desktop (`media="(min-width: 768px)"`). Until the church supplies a real video,
the CSS `hero__fallback.jpg` image is shown instead (see `images/hero-fallback.jpg`).

## How to add a real video

### Option 1 — Use Pixabay CC0 drone footage (free, no attribution)

Download one of these, trim to ~15–30 seconds, and save as `/videos/hero-drone.mp4`:

| Video | Description | Source URL |
|---|---|---|
| Drone river flight | "Drone in the clouds flying over the river in Amapa" | https://cdn.pixabay.com/video/2024/05/29/214268_tiny.mp4 |
| Somerset aerial | "Aerial view above a curvy road in Somerset England" | https://cdn.pixabay.com/video/2024/04/20/208744_large.mp4 |
| Church drone search | "Church drone view" results | https://pixabay.com/videos/search/church%20drone%20view/ |

### Option 2 — Church's own footage (ideal)

A short, quiet 15–30 second clip of:
- The Titusville Civic Center exterior
- The church setting up before service
- A Sunday morning wide shot (if permitted to film)
- Sunrise/sunset over Titusville

### Optimization requirements (keep it fast)

- **Resolution:** 1280px wide max (the hero is a background — no need for 4K)
- **Codec:** H.264 (mp4 container) — universal browser support
- **Duration:** 15–30 seconds (looped)
- **File size:** Under 10MB (aim for 2–5MB)
- **Bitrate:** ~2–4 Mbps for 720p/1080p
- **No audio track:** The video is muted by default (autoplay policy requires it)

### How to optimize (free tools)

**ffmpeg** (free, open-source):
```bash
# Trim to 25 seconds from the start, scale to 1280px wide, 2.5 Mbps
ffmpeg -i input.mp4 -t 25 -vf "scale=1280:-1,format=yuv420p" -b:v 2500k -an hero-drone.mp4

# Smaller version for slower connections (1MB max)
ffmpeg -i input.mp4 -t 20 -vf "scale=854:-1,format=yuv420p" -b:v 1500k -an hero-drone-small.mp4
```

**HandBrake** (free GUI):
- Preset: "Fast 480p30" or "Fast 720p30"
- Constant quality: RF 28–32
- No audio
- Web optimized (check "Web Optimized")

## CSS behavior

- The video only **loads on desktop** (≥768px) via `media="(min-width: 768px)"` on the `<source>`
- Mobile/tablet sees the **static fallback image** — saves bandwidth and avoids autoplay issues
- `prefers-reduced-motion` users skip the video entirely
- Once the video loads, the `.loaded` class hides the fallback image

## License

The hero video must be either:
1. **CC0 / Pixabay** (free, no attribution required) — safe for the church to use
2. **Church-owned footage** (with permission) — ideal for authenticity
3. **Never** from Shutterstock/Adobe Stock (licensing issues for church websites)
