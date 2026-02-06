# Video Assets Placeholder

This directory is ready for your project videos.

## Recommended Video Files

### Project Previews (for hover effects)
- `alphaflow-preview.mp4` - Short preview clip (5-10 seconds, muted)
- `pulsegate-preview.mp4`
- `swapex-preview.mp4`
- `erevshabbat-preview.mp4`
- `metasleek-preview.mp4`

### Project Detail Pages
- `alphaflow-demo.mp4` - Full project demonstration video
- `pulsegate-demo.mp4`
- `swapex-demo.mp4`
- `erevshabbat-demo.mp4`
- `metasleek-demo.mp4`

## Video Guidelines

### For Hover Previews
- **Duration**: 5-10 seconds maximum
- **Format**: MP4 (H.264 codec)
- **Resolution**: 720p (1280x720px) or 1080p
- **Bitrate**: 1-2 Mbps (keep file size small)
- **Audio**: None (muted autoplay)
- **File Size**: < 2 MB per video

### For Demo Videos
- **Duration**: 1-3 minutes
- **Format**: MP4 (H.264 codec)
- **Resolution**: 1080p (1920x1080px)
- **Bitrate**: 3-5 Mbps
- **Audio**: Optional (include captions if used)
- **File Size**: < 20 MB per video

## Video Optimization Tips

1. **Compress videos** using tools like:
   - HandBrake (free, desktop app)
   - FFmpeg (command-line tool)
   - CloudConvert (online converter)

2. **Use proper codecs**:
   - Video: H.264 (best compatibility)
   - Audio: AAC (if audio is included)

3. **Consider alternatives**:
   - Use animated GIFs for simple previews
   - Use Lottie animations for lightweight motion
   - Host videos on Vimeo/YouTube and embed them

## Implementation Status

✅ Directory structure created
⏳ Hover preview functionality prepared (commented in code)
⏳ Video files to be added
⏳ Uncomment video-related code when videos are ready

## How to Enable Video Features

Once you add videos to this directory:

1. **Update HTML files** - Uncomment the video elements in:
   - `/public/index.html` (project tiles)
   - `/public/projects/*.html` (project detail pages)

2. **Update JavaScript** - Uncomment video hover code in:
   - `/js/main.js` (see `initVideoHoverPreview()` function)

3. **Test autoplay** - Note that browsers have autoplay restrictions:
   - Videos must be muted for autoplay
   - User interaction may be required
   - Always provide fallback poster images

---

**Note**: Video hover previews are currently disabled. The site uses static placeholder images instead.
