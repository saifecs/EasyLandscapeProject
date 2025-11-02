# Easy Landscape Services Ltd. Website

A complete website solution for Easy Landscape Services Ltd., including frontend pages and backend API for quote form submissions.

## Project Structure

```
EasyLandscapeProject/
├── index.html              # Home page
├── landscape.html          # Landscape services page
├── construction.html       # Construction services page
├── construction-quote.html # Construction quote form
├── projects-gallery.html   # Projects gallery page
├── quote.html              # Landscape quote form
├── about.html              # About page (if exists)
├── styles.css              # Main stylesheet
├── main.js                 # Frontend JavaScript
├── server.js               # Backend Express server
├── package.json            # Node.js dependencies
└── .env                    # Environment variables (create this)
```

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install:
- Express (web server)
- Nodemailer (email sending)
- CORS (cross-origin requests)
- dotenv (environment variables)

### 2. Configure Environment

Create a `.env` file in the project root:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-gmail-app-password
TO_EMAIL=myoussef@easylandscape.ca
PORT=3000
```

**Gmail App Password Setup:**
1. Go to Google Account → Security
2. Enable 2-Step Verification
3. Create an App Password for "Mail"
4. Use that 16-character password (not your regular Gmail password)

### 3. Start the Backend Server

```bash
npm start
```

The server will run on `http://localhost:3000`

### 4. Run the Frontend

You can serve the frontend using any static file server:

**Option 1: Python (if installed)**
```bash
python3 -m http.server 8000
```
Then visit: `http://localhost:8000`

**Option 2: Node.js http-server**
```bash
npx http-server -p 8000
```

**Option 3: VS Code Live Server**
- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

## Features

### Frontend Pages
- **Home Page** (`index.html`) - Main landing page with services overview
- **Landscape Services** (`landscape.html`) - Detailed landscape services
- **Construction Services** (`construction.html`) - Construction services
- **Quote Forms** - Separate forms for landscape and construction quotes
- **Projects Gallery** (`projects-gallery.html`) - Portfolio showcase

### Backend API
- **POST `/api/quotes`** - Receives quote submissions from both forms
- **POST `/submit-form`** - Legacy endpoint for simple forms
- Automatically sends formatted emails with all form data

## API Endpoints

### POST `/api/quotes`

Receives quote submissions from both landscape and construction forms.

**Request Body:**
- Landscape quotes: `formType: "landscape_quote"`
- Construction quotes: `formType: "construction_quote"`

**Response:**
```json
{
  "success": true,
  "message": "Quote request received successfully"
}
```

## Development

### Backend Development
- Server runs on port 3000 (configurable via `.env`)
- CORS enabled for local development
- All quote requests are logged to console

### Frontend Development
- Static HTML/CSS/JavaScript
- Uses Bootstrap 5 for styling
- Leaflet.js for map functionality in quote form
- Font Awesome for icons

## Production Deployment

### Backend
1. Deploy to a Node.js hosting service (Heroku, Railway, Render, etc.)
2. Set environment variables in your hosting platform
3. Update `API_BASE_URL` in `quote.html` and `construction-quote.html` to your production URL

### Frontend
1. Deploy to any static hosting (GitHub Pages, Netlify, Vercel, etc.)
2. Update API URLs from `http://localhost:3000` to your production backend URL

## Troubleshooting

- **"Invalid login" error**: Make sure you're using a Gmail App Password, not your regular password
- **CORS errors**: Backend has CORS enabled - check browser console for specific errors
- **Port already in use**: Change PORT in `.env` or stop the process using port 3000
- **Forms not submitting**: Check browser console (F12) for errors and verify backend is running

## Documentation

- `BACKEND_SETUP.md` - Detailed backend setup instructions
- `BACKEND_API_DOCS.md` - Complete API documentation
- `EMAILJS_SETUP.md` - Alternative EmailJS setup (if not using backend)

## License

ISC
