# Photo Share App

A simple web application for capturing photos, uploading them to Cloudinary, and generating QR codes for easy sharing.

## ✨ Features

- **Camera Capture** – Take photos using device camera or upload from gallery
- **Cloud Upload** – Automatically uploads to Cloudinary
- **QR Code Sharing** – Generates a scannable QR code for the uploaded image
- **Copy Link** – One-tap copy of the Cloudinary URL
- **Download QR** – Save the QR code as an image

## 🛠️ Tech Stack

- **React 19** + **Vite 7**
- **Tailwind CSS 4** (via @tailwindcss/vite plugin)
- **Cloudinary** for image hosting
- **qrcode** for QR code generation
- Fully client-side — no backend required

## ⚙️ Configuration

Before using, update your Cloudinary credentials in `src/services/cloudinary.js`:

```javascript
export const CLOUDINARY_CONFIG = {
    cloudName: 'YOUR_CLOUD_NAME',       // Your Cloudinary cloud name
    uploadPreset: 'YOUR_UPLOAD_PRESET', // Unsigned upload preset
    folder: 'photo-booth',              // Folder for uploads
};
```

### Setting up Cloudinary

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to **Settings** → **Upload** → **Upload presets**
3. Create a new **unsigned** upload preset
4. Copy your **Cloud name** (from Dashboard) and **preset name**

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── App.jsx                     # Main app (2-step flow)
├── components/
│   ├── CameraCapture.jsx       # Native camera/file input
│   ├── QRCodeDisplay.jsx       # QR code generation & display
│   └── ResultPage.jsx          # Upload status & QR sharing
├── services/
│   └── cloudinary.js           # Cloudinary upload service
```

## 📱 Usage Flow

1. **Capture** – Open app and tap "Take Photo" or "Upload from Gallery"
2. **Upload** – Photo automatically uploads to Cloudinary
3. **Share** – Scan the QR code or copy the URL to share

## 📄 License

MIT
