# Church website best practices — references for this demo

Sources reviewed to shape the LifePointe Ministries demo:

- BoxCast, *Church Website Design Trends + Best Practices* (Feb 2024) — https://www.boxcast.com/blog/church-website-design-trends-and-best-practices
- UKChurches, *Essential Best Practices for Church Websites in 2025* — https://www.ukchurches.co.uk/essential-best-practices-for-church-websites-in-2025
- Forbes Advisor, *9 Best Church Website Builders* — https://www.forbes.com/advisor/business/software/best-church-website-builder

## Principles pulled into the demo

1. **Mobile-first, responsive.** Most traffic is mobile. The demo uses a responsive layout that works from phone to desktop.
2. **Clear audience paths.** The home page leads with three paths: "I'm new," "I need help," "I want to serve" — each with a visible next step. This is the single biggest win over a wall of generic content.
3. **Service times and location visible early.** No hunt for the basics. Address, phone, email, and Sunday times are within the first screenful and repeated in the footer.
4. **One source of truth for contact info.** `data/site.json` holds phone/address/email once. In a real build this could be rendered server-side or injected; for a static demo it's the "don't copy-paste your phone number four times" fix.
5. **Outreach gets space.** CREW 29 Outreach has its own page with what's provided, who it's for, volunteer info, and a FAQ. Outreach is a differentiator for this church — it deserves more than a paragraph.
6. **Offline giving is shown.** Many church donors still give by check or in person. The give page lists online, in-person, and mail options — not just a donate button.
7. **Accessibility.** Semantic HTML, a skip link, focus styles, color contrast, descriptive link text, and ARIA only where it earns its place. Target WCAG 2.1 AA.
8. **Local SEO / discovery.** Meta titles, descriptions, Open Graph, and a `Church` structured-data block with name, address, phone, and service times. A Google Business Profile is the bigger lever and is called out in the README.
9. **No tracking, no dependencies.** Static HTML, one CSS file, one small JS file. Nothing to install, nothing to break, nothing to keep patched. Hostable anywhere.
10. **Content honesty.** Placeholder blocks and `[TODO]` markers mark where the church needs to supply its own facts — beliefs, CREW 29 schedule, kids policy, photos. Better an honest placeholder than fabricated copy.

## What the demo does NOT attempt

- Multi-language, sermon/archive system, live streaming, members-only area, online registration/payments beyond the existing Breeze link, CMS volunteer editing. Those are real needs but out of scope for a first demo; each is a separate conversation with the church.
