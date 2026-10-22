# Sara Digix website

Static website (HTML, CSS, JavaScript). No build step and no dependencies.

## Run locally
- Quickest: double-click `index.html`.
- Or from this folder run `python3 -m http.server 8000` and open http://localhost:8000

## Edit your details: `js/config.js` (one file)
| Setting | Purpose |
|---|---|
| `whatsappNumber` | WhatsApp chat (`919344611648`) -> opens `https://wa.me/919344611648` |
| `contactPhone` | Phone calls (`+919509120086`) -> `tel:` links |
| `instagramUsername` | Leave `""` for now. Later set e.g. `"yourusername"` (no @) and every Instagram icon/button links to `https://www.instagram.com/yourusername/` |
| `email` | Optional. Empty = hidden everywhere |
| `companyName`, `tagline`, `whatsappMessage` | Branding and the default WhatsApp message |

Per-page WhatsApp messages are in the `data-whatsapp="..."` attributes of each HTML file.

## Adding your video and images (developer only)
Visitors cannot upload anything. Each page has a ready slot that shows an empty placeholder until you fill it:
- Reels: 1 video slot. Posts, Meta Ads, Google Ads: 1 image slot each, with title and description.

To fill a slot:
1. Copy the file into its folder: `videos/`, `images/posts/`, `images/meta-ads/` or `images/google-ads/`.
2. Open `js/content.js`, put the path in `src` (e.g. `src: "videos/reel-1.mp4"`) and edit `title` and `description`.
3. Save and refresh. To add more slots, copy a whole `{ ... },` line.

Use MP4 (H.264) for videos so they play in every browser.

### Video does not play?
1. The `src` path must match the file exactly (spelling, capital letters, `.mp4`). Example: file `videos/reel-1.mp4` -> `src: "videos/reel-1.mp4"`. Avoid spaces in file names.
2. Phone/editor videos are often H.265 (HEVC) or .mov and will not play in many browsers. Convert to H.264 MP4 (free): `ffmpeg -i input.mov -c:v libx264 -pix_fmt yuv420p -c:a aac output.mp4`, or use HandBrake or an online converter.
3. Keep `js/content.js` and the `videos/` folder inside the unzipped project, then refresh with Ctrl+F5.

## Logo
`assets/logo.png` (full logo, resized from your original) and `assets/logo-mark.png` / `favicon.png` (the SD monogram cropped from the same file).
