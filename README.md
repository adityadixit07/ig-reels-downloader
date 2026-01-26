# Instagram Downloader

A Next.js application that allows users to download Instagram posts and reels from public accounts without requiring login.

## Features

- 📸 **Download Posts** - Download single or carousel posts from public Instagram accounts
- 🎬 **Download Reels** - Download Instagram reels/videos
- ✨ **Quality Enhancement** - Enhance image quality with AI-powered upscaling options
- 📊 **Quality Detection** - Automatically detects and displays media quality (SD, HD, FHD, 2K, 4K)
- 🔒 **Public Accounts Only** - Automatically verifies that accounts are public before downloading
- 🚫 **No Login Required** - Users can download content without creating an account
- 🎨 **Modern UI** - Beautiful, responsive interface built with Tailwind CSS

## Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

## Installation

1. Clone or navigate to the project directory:
```bash
cd ig-downloader
```

2. Install dependencies:
```bash
npm install
```

## Usage

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to:
```
http://localhost:3000
```

3. To download content:
   - Select the content type (Post or Reel)
   - Paste the Instagram URL
   - Click "Download"
   - Preview the media and see quality information
   - Choose to download original or enhanced quality (for images)
   - Select enhancement options: Sharpen, HD (2K), 2x Scale, or 4x Scale

## How It Works

### Posts & Reels
- Paste the Instagram post/reel URL (e.g., `https://www.instagram.com/p/ABC123xyz/`)
- The app verifies the account is public
- Extracts media URLs from the Instagram page
- Allows you to preview and download the content

## API Endpoints

- `POST /api/download/post` - Download Instagram post
- `POST /api/download/reel` - Download Instagram reel
- `GET /api/download/media` - Proxy endpoint to download media files
- `POST /api/enhance` - Enhance image quality (upscaling, sharpening)

## Project Structure

```
ig-downloader/
├── app/
│   ├── api/
│   │   └── download/
│   │       ├── post/
│   │       ├── reel/
│   │       └── media/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── DownloadForm.tsx
│   └── MediaPreview.tsx
├── lib/
│   └── instagram-scraper.ts
└── package.json
```

## Important Notes

⚠️ **Limitations:**
- Only works with **public Instagram accounts**
- Instagram may change their page structure, which could break scraping
- Rate limiting may apply if making too many requests

⚠️ **Legal & Ethical Considerations:**
- Only download content you have permission to download
- Respect copyright and intellectual property rights
- Do not use this tool to download private content
- This tool is for personal use only

## Building for Production

```bash
npm run build
npm start
```

## Quality Enhancement

The app includes quality enhancement features for images:

- **Quality Detection**: Automatically detects image resolution from Instagram CDN URLs
- **Enhancement Options**:
  - **Sharpen**: Improves image sharpness without changing size
  - **HD (2K)**: Upscales to 1920px max dimension
  - **2x Scale**: Doubles image dimensions
  - **4x Scale**: Quadruples image dimensions
- **Smart Recommendations**: Suggests enhancement for lower quality images

**Note**: Enhancement requires the `sharp` package. Install it with:
```bash
npm install sharp
```

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Cheerio** - HTML parsing and scraping
- **Sharp** - Image processing and enhancement

## Troubleshooting

### "Failed to scrape Instagram post"
- The account might be private
- Instagram may have changed their page structure
- The URL might be invalid

### "Only public accounts can be downloaded"
- Verify the account is public
- Try accessing the account in an incognito browser window

## License

This project is for educational purposes only. Use responsibly and in accordance with Instagram's Terms of Service.
