# 🌸 Nashuuu's Little Survival Space

A tiny handmade comfort corner, built by Nissuuu for Nashuuu. Plain HTML, CSS and vanilla JavaScript. No backend, no login, no tracking.

## Open it

- **Locally:** keep `index.html`, `style.css` and `script.js` in the same folder and open `index.html` in a browser.
- **On her phone:** upload the folder to a free static host (Netlify Drop, GitHub Pages, Cloudflare Pages) and send her the link. Add it to her home screen for the full-screen feel.
- The fonts (Fraunces, Nunito, Caveat) load from Google Fonts. Offline, the site falls back to system fonts.

## Customize

- **Music:** open `script.js` and paste Spotify or YouTube links into the `url` fields of `PLAYLISTS`. No music is bundled. Until a link is added, the play button says so politely.
- **Words:** the notes, missions, panda lines, chaos levels and button messages are plain arrays near the matching section in `script.js`. Edit freely.
- **Colors:** the palette lives in the `:root` and `body.night` variables at the top of `style.css`.

## Where things are

| Experience | How to reach it |
|---|---|
| Opening scene | First screen |
| Mood cards and "I need Nissuuu" mode | Home |
| Choose what you need (six mini experiences) | Below the mood cards |
| Chaos meter | Slider with panda reactions |
| Comfort Station | Tap the objects (🌙 starts Goodnight) |
| Nissuuu's notes | Drawer of 8 notes |
| Press this | The giant button |
| Brain off mode | Lavender room with 30 sec / 1 min timers |
| Night mode | 🌙 in the top bar |
| Secret message | One tiny flower is hiding on the Comfort Station windowsill 🌼 |
| Final surprise | Bottom of the page |

## Privacy and boundaries

- `localStorage` only holds harmless preferences: night theme on/off, number of tiny missions completed, and whether the secret was found (keys start with `nsp-`).
- Text typed into the "tell panda everything" box is never stored or sent anywhere. It floats away.
- This is not a medical tool or a tracker. It gives no medical advice and collects no health data. The chaos meter is just for fun and includes a gentle reminder to contact a doctor if pain ever feels severe or scary.
- It's a friendship care package: no romantic or sexual content, and nothing that replaces real people or real care.
