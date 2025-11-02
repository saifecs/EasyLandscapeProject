# Google Sheets Setup Guide

This guide will help you configure your backend to save quote requests to Google Sheets.

## Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click on the project dropdown at the top
3. Click **New Project**
4. Enter project name (e.g., "Easy Landscape Quotes")
5. Click **Create**

## Step 2: Enable Google Sheets API

1. In your Google Cloud project, go to **APIs & Services** → **Library**
2. Search for "Google Sheets API"
3. Click on it and click **Enable**

## Step 3: Create Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Enter a name (e.g., "sheets-service")
4. Click **Create and Continue**
5. Skip optional steps and click **Done**

## Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to the **Keys** tab
3. Click **Add Key** → **Create new key**
4. Select **JSON** format
5. Click **Create** - This downloads a JSON file

**Important:** Keep this file secure! Don't commit it to git.

## Step 5: Create Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Easy Landscape Quotes"
4. Copy the **Spreadsheet ID** from the URL:
   - URL looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` part

## Step 6: Share Spreadsheet with Service Account

1. In your Google Spreadsheet, click **Share** button
2. Paste the **Service Account Email** (from the JSON file you downloaded, it's the `client_email` field)
3. Give it **Editor** permissions
4. Click **Send**

## Step 7: Extract Credentials from JSON

Open the downloaded JSON file. You need two values:

1. **Service Account Email**: `client_email` field
2. **Private Key**: `private_key` field (keep all the `\n` characters)

Example JSON:
```json
{
  "type": "service_account",
  "project_id": "your-project",
  "private_key_id": "...",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account@project.iam.gserviceaccount.com",
  ...
}
```

## Step 8: Update Your .env File

Add these lines to your `.env` file:

```env
# Google Sheets Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SPREADSHEET_ID=your-spreadsheet-id-here
```

**Important Notes:**
- Keep the quotes around `GOOGLE_PRIVATE_KEY`
- Keep all `\n` characters in the private key
- The private key should be on multiple lines (with `\n`)

## Step 9: Set Up Spreadsheet Headers

Your Google Spreadsheet needs headers in the first row. Create two sheets:

### Sheet 1: "Landscape Quotes"
Headers in row 1:
```
Timestamp | Name | Email | Phone | Service | Message | Yard Area (sq ft) | Yard Area (sq m) | Map Location
```

### Sheet 2: "Construction Quotes"
Headers in row 1:
```
Timestamp | Name | Email | Phone | Address | Service Type | Project Details | Approx Size (sq ft) | Timeline | Budget Range | Additional Info
```

## Step 10: Install Dependencies and Restart

```bash
npm install
npm start
```

## Testing

Submit a test quote from your website form. Check your Google Spreadsheet - you should see a new row added automatically!

## Troubleshooting

- **"The caller does not have permission"**: Make sure you shared the spreadsheet with the service account email
- **"Spreadsheet not found"**: Double-check your `GOOGLE_SPREADSHEET_ID` in `.env`
- **"Invalid credentials"**: Make sure your private key includes the `\n` characters and is wrapped in quotes
- **"Cannot read property 'authorize'"**: Make sure all environment variables are set correctly

## Optional: Send Both Email AND Save to Sheets

You can configure both! Just include both email and Google Sheets credentials in your `.env` file. The system will:
1. Save to Google Sheets
2. Send an email notification

Both will happen automatically when a quote is submitted.


