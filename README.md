# BunBunGram 🐰♡

A no-login, Instagram-Reels-style website for your shared videos.

## The easy workflow

1. Copy your videos into the `videos` folder.
2. Double-click `update-videos.bat` on Windows.
3. It scans the folder and rebuilds `videos.json` automatically.
4. Open/deploy the website.
5. Every discovered video appears in the feed.

Example:

    videos/
      Our first date.mp4
      Bunbun being silly.mp4
      That smile.mp4

The filenames automatically become captions:
`Bunbun being silly.mp4` → `Bunbun being silly`

You can rename the files before running the updater to control the captions.

## Requirements for the updater

Windows needs Python installed. During Python installation, enable "Add Python to PATH".
On macOS/Linux, run:

    ./update-videos.sh

or:

    python3 generate_videos.py

## Deploying

Because this is a static project, after adding videos and running the updater you must redeploy/push the changed files to your host.

You can deploy the folder to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or a normal web server.

## Features

- BunBunGram branding
- No signup/login
- Full-screen vertical reels
- Automatic playback while scrolling
- Double-tap to like
- Likes saved on each device
- Liked-reels section
- Random reel
- Sound controls
- Fullscreen
- Shareable individual reel links
- Mobile + desktop responsive design
- Automatic captions from filenames

## Important

A website hosted on Vercel/Cloudflare Pages cannot inspect a local `/videos` directory after deployment.
That is why `update-videos.bat` generates `videos.json` before deployment.

There is also no authentication by design. Anyone who receives your public URL may be able to view it.
