# BunBunGram 🐰♡

This version requires **no Python, Node.js, Supabase, or database**.

## Add a new Reel on Windows

1. Copy your video into the `videos` folder.
2. Double-click `update-videos.bat`.
3. A window will tell you how many videos were found.
4. `videos.json` is updated automatically.
5. Redeploy/push the project to your hosting provider.

That's it.

Example:

    BunBunGram/
    ├── videos/
    │   ├── Our first date.mp4
    │   ├── Bunbun being silly.mp4
    │   └── That smile.mp4
    ├── update-videos.bat
    ├── update-videos.ps1
    ├── videos.json
    ├── index.html
    ├── style.css
    └── app.js

## Captions

The filename becomes the caption automatically.

`Bunbun-being-silly.mp4`
becomes:
`Bunbun being silly`

Rename a video before running the updater if you want a different caption.

## Supported files

- MP4
- WebM
- MOV
- M4V
- OGG

MP4 (H.264/AAC) is recommended for the best browser compatibility.

## Features

- BunBunGram branding
- No viewer signup or login
- Instagram-style vertical Reel feed
- Autoplay while scrolling
- Double-tap heart
- Likes saved locally on each device
- Liked Reels tab
- Random Reel
- Mute/unmute
- Fullscreen
- Individual Reel sharing links
- Automatic captions from filenames
- Responsive mobile and desktop layouts

## Important hosting limitation

The updater runs on your Windows PC. After adding videos and running it, redeploy the changed project so the online BunBunGram receives the new video files and `videos.json`.

Because BunBunGram intentionally has no authentication, anyone who receives the public deployment URL may be able to view the reels.
