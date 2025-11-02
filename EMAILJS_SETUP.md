# EmailJS Setup Guide

This guide will help you configure EmailJS to receive quote requests via email from your website forms.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" (it's free - 200 emails/month on free tier)
3. Create your account using your email address

## Step 2: Add Email Service

1. Once logged in, go to **Email Services** in the left sidebar
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps for your email provider
5. Note down your **Service ID** (you'll need this later)

## Step 3: Create Email Templates

You need to create TWO email templates - one for landscape quotes and one for construction quotes.

### Template 1: Landscape Quote Request

1. Go to **Email Templates** in the left sidebar
2. Click **Create New Template**
3. Use these settings:
   - **Template Name**: `landscape_quote`
   - **Subject**: `New Landscape Quote Request from {{from_name}}`
   - **Content** (HTML):
   ```html
   <h2>New Landscape Quote Request</h2>
   
   <p><strong>Name:</strong> {{from_name}}</p>
   <p><strong>Email:</strong> {{from_email}}</p>
   <p><strong>Phone:</strong> {{phone}}</p>
   <p><strong>Service:</strong> {{service}}</p>
   <p><strong>Message:</strong> {{message}}</p>
   
   <h3>Yard Measurement Details:</h3>
   <p><strong>Area (sq. ft.):</strong> {{yard_area_sqft}}</p>
   <p><strong>Area (sq. m):</strong> {{yard_area_sqm}}</p>
   <p><strong>Map Location:</strong> {{map_location}}</p>
   
   <hr>
   <p><em>This is an automated email from your website contact form.</em></p>
   ```
4. Click **Save**
5. Note down your **Template ID** (you'll need this later)

### Template 2: Construction Quote Request

1. Click **Create New Template** again
2. Use these settings:
   - **Template Name**: `construction_quote`
   - **Subject**: `New Construction Quote Request from {{from_name}}`
   - **Content** (HTML):
   ```html
   <h2>New Construction Quote Request</h2>
   
   <p><strong>Name:</strong> {{from_name}}</p>
   <p><strong>Email:</strong> {{from_email}}</p>
   <p><strong>Phone:</strong> {{phone}}</p>
   <p><strong>Project Address:</strong> {{address}}</p>
   <p><strong>Service Type:</strong> {{service_type}}</p>
   
   <h3>Project Details:</h3>
   <p>{{project_details}}</p>
   
   <h3>Project Information:</h3>
   <p><strong>Approximate Size:</strong> {{approximate_size}} sq. ft.</p>
   <p><strong>Preferred Timeline:</strong> {{preferred_timeline}}</p>
   <p><strong>Budget Range:</strong> {{budget_range}}</p>
   <p><strong>Additional Information:</strong> {{additional_info}}</p>
   
   <hr>
   <p><em>This is an automated email from your website contact form.</em></p>
   ```
3. Click **Save**
4. Note down your **Template ID** (you'll need this later)

## Step 4: Get Your Public Key

1. Go to **Account** → **General** in the left sidebar
2. Find your **Public Key** (it looks like: `abc123xyz456`)
3. Copy this key

## Step 5: Update Your Website Files

You need to replace the placeholder values in two files:

### Update `quote.html`:

Find these three lines (around line 153, 187):
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Replace with your actual values:
```javascript
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY_HERE");
emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_LANDSCAPE_TEMPLATE_ID_HERE', templateParams)
```

### Update `construction-quote.html`:

Find these two lines (around line 238, 272):
```javascript
emailjs.init("YOUR_PUBLIC_KEY");
emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
```

Replace with your actual values:
```javascript
emailjs.init("YOUR_ACTUAL_PUBLIC_KEY_HERE");
emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_CONSTRUCTION_TEMPLATE_ID_HERE', templateParams)
```

## Step 6: Test Your Forms

1. Visit your website's quote pages
2. Fill out the forms and submit
3. Check your email inbox - you should receive the quote requests!

## Troubleshooting

- **No emails received?** 
  - Check your spam folder
  - Verify your EmailJS service is connected properly
  - Check the browser console (F12) for any error messages

- **Template variables not showing?**
  - Make sure variable names match exactly (they're case-sensitive)
  - Use double curly braces: `{{variable_name}}`

- **Form not submitting?**
  - Make sure you've replaced all `YOUR_PUBLIC_KEY`, `YOUR_SERVICE_ID`, and `YOUR_TEMPLATE_ID` placeholders
  - Check browser console for JavaScript errors

## Alternative: Google Sheets Integration

If you prefer to save submissions to Google Sheets instead of (or in addition to) email:

1. Create a Google Sheet with column headers:
   - Name, Email, Phone, Service, Message, Date
2. Use Google Apps Script to receive form data
3. This requires more setup but gives you a spreadsheet database

For Google Sheets setup, see the Google Apps Script documentation or contact for assistance.

---

**Need Help?** EmailJS has great documentation at [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)


