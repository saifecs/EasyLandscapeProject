# Backend Setup Guide

## Installation

1. Make sure you have Node.js installed (version 18 or higher)

2. Install dependencies:
```bash
npm install
```

## Environment Configuration

Create a `.env` file in your backend directory with the following:

```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
TO_EMAIL=myoussef@easylandscape.ca
PORT=3000
```

### Gmail App Password Setup

Since Gmail requires app passwords for SMTP:

1. Go to your Google Account settings
2. Navigate to **Security** → **2-Step Verification** (must be enabled)
3. Scroll down to **App passwords**
4. Generate a new app password for "Mail"
5. Copy the 16-character password and use it as `EMAIL_PASS` in your `.env` file

**Important:** Use the App Password, NOT your regular Gmail password!

## Running the Server

```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### POST `/api/quotes`
Receives quote submissions from both landscape and construction forms.

**Request Body:**
```json
{
  "formType": "landscape_quote" | "construction_quote",
  "name": "John Doe",
  "email": "john@example.com",
  // ... other fields depending on form type
}
```

**Response:**
```json
{
  "success": true,
  "message": "Quote request received successfully"
}
```

### POST `/submit-form` (Legacy)
Kept for backward compatibility with simple form submissions.

## Email Configuration

The server uses Nodemailer with Gmail to send emails. All quote requests are sent to the email address specified in `TO_EMAIL`.

## Testing

You can test the server using curl:

```bash
# Test landscape quote
curl -X POST http://localhost:3000/api/quotes \
  -H "Content-Type: application/json" \
  -d '{
    "formType": "landscape_quote",
    "name": "Test User",
    "email": "test@example.com",
    "phone": "403-555-1234",
    "service": "Lawn Maintenance"
  }'
```

## Troubleshooting

- **"Invalid login"**: Make sure you're using an App Password, not your regular Gmail password
- **"2-Step Verification required"**: Enable 2-Step Verification in your Google Account
- **CORS errors**: The server has CORS enabled, but make sure your frontend URL is allowed
- **Port already in use**: Change the PORT in your `.env` file or stop the process using port 3000


