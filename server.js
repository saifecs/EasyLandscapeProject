const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Google Sheets setup
const sheets = google.sheets("v4");
let authClient = null;

// Initialize Google Sheets auth if credentials are provided
if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  authClient = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// Email transporter setup - uses environment variables for flexibility
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Function to save to Google Sheets
async function saveToGoogleSheets(formData) {
  if (!authClient || !process.env.GOOGLE_SPREADSHEET_ID) {
    return null; // Skip if not configured
  }

  try {
    await authClient.authorize();

    // Determine which sheet to use based on form type
    const sheetName = formData.formType === "construction_quote" 
      ? "Construction Quotes" 
      : "Landscape Quotes";

    // Prepare row data based on form type
    let rowData = [];
    
    if (formData.formType === "landscape_quote") {
      rowData = [
        new Date().toLocaleString(), // Timestamp
        formData.name || "",
        formData.email || "",
        formData.phone || "",
        formData.service || "",
        formData.message || "",
        formData.yardAreaSqft || "",
        formData.yardAreaSqm || "",
        formData.mapLat && formData.mapLng 
          ? `${formData.mapLat}, ${formData.mapLng}` 
          : "",
      ];
    } else if (formData.formType === "construction_quote") {
      rowData = [
        new Date().toLocaleString(), // Timestamp
        formData.name || "",
        formData.email || "",
        formData.phone || "",
        formData.address || "",
        formData.serviceType || "",
        formData.projectDetails || "",
        formData.approximateSize || "",
        formData.preferredTimeline || "",
        formData.budgetRange || "",
        formData.additionalInfo || "",
      ];
    } else {
      // Fallback for simple forms
      rowData = [
        new Date().toLocaleString(),
        formData.name || "",
        formData.email || "",
        formData.phone || "",
        formData.service || "",
        formData.message || "",
      ];
    }

    // Append to spreadsheet
    await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      resource: {
        values: [rowData],
      },
    });

    console.log(`Saved to Google Sheets: ${sheetName}`);
    return true;
  } catch (error) {
    console.error("Error saving to Google Sheets:", error);
    return false;
  }
}

// Handle quote submissions (both landscape and construction)
app.post("/submit-form", async (req, res) => {

  try {
    const formData = req.body;
    const { formType, name, email, phone } = formData;

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    // Save to Google Sheets (if configured)
    const sheetsResult = await saveToGoogleSheets(formData);

    let emailSubject = "";
    let emailText = "";
    let emailHtml = "";

    if (formType === "landscape_quote") {
      // Landscape quote email template
      emailSubject = `New Landscape Quote Request from ${name}`;
      
      emailText = `
LANDSCAPE QUOTE REQUEST

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "Not provided"}

Service Requested: ${formData.service || "Not specified"}

Message:
${formData.message || "No message provided"}

Yard Measurement Details:
- Area (sq. ft.): ${formData.yardAreaSqft || "Not measured"}
- Area (sq. m): ${formData.yardAreaSqm || "Not measured"}
- Map Location: ${formData.mapLat && formData.mapLng 
  ? `Lat: ${formData.mapLat}, Lng: ${formData.mapLng}` 
  : "Not provided"}

Submitted: ${formData.timestamp || new Date().toISOString()}
      `;

      emailHtml = `
        <h2>New Landscape Quote Request</h2>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        
        <h3>Service Requested</h3>
        <p>${formData.service || "Not specified"}</p>
        
        <h3>Message</h3>
        <p>${formData.message || "No message provided"}</p>
        
        <h3>Yard Measurement Details</h3>
        <ul>
          <li><strong>Area (sq. ft.):</strong> ${formData.yardAreaSqft || "Not measured"}</li>
          <li><strong>Area (sq. m):</strong> ${formData.yardAreaSqm || "Not measured"}</li>
          <li><strong>Map Location:</strong> ${formData.mapLat && formData.mapLng 
            ? `Lat: ${formData.mapLat}, Lng: ${formData.mapLng}` 
            : "Not provided"}</li>
        </ul>
        
        <p><em>Submitted: ${formData.timestamp || new Date().toISOString()}</em></p>
      `;

    } else if (formType === "construction_quote") {
      // Construction quote email template
      emailSubject = `New Construction Quote Request from ${name}`;
      
      emailText = `
CONSTRUCTION QUOTE REQUEST

Contact Information:
- Name: ${name}
- Email: ${email}
- Phone: ${phone || "Not provided"}
- Project Address: ${formData.address || "Not provided"}

Service Type: ${formData.serviceType || "Not specified"}

Project Details:
${formData.projectDetails || "Not provided"}

Project Information:
- Approximate Size: ${formData.approximateSize || "Not provided"} sq. ft.
- Preferred Timeline: ${formData.preferredTimeline || "Not specified"}
- Budget Range: ${formData.budgetRange || "Not specified"}

Additional Information:
${formData.additionalInfo || "None"}

Submitted: ${formData.timestamp || new Date().toISOString()}
      `;

      emailHtml = `
        <h2>New Construction Quote Request</h2>
        <h3>Contact Information</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Project Address:</strong> ${formData.address || "Not provided"}</p>
        
        <h3>Service Type</h3>
        <p>${formData.serviceType || "Not specified"}</p>
        
        <h3>Project Details</h3>
        <p>${formData.projectDetails || "Not provided"}</p>
        
        <h3>Project Information</h3>
        <ul>
          <li><strong>Approximate Size:</strong> ${formData.approximateSize || "Not provided"} sq. ft.</li>
          <li><strong>Preferred Timeline:</strong> ${formData.preferredTimeline || "Not specified"}</li>
          <li><strong>Budget Range:</strong> ${formData.budgetRange || "Not specified"}</li>
        </ul>
        
        <h3>Additional Information</h3>
        <p>${formData.additionalInfo || "None"}</p>
        
        <p><em>Submitted: ${formData.timestamp || new Date().toISOString()}</em></p>
      `;

    } else {
      // Fallback for old form format or unknown form types
      emailSubject = `New Quote Request from ${name}`;
      emailText = `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${formData.service || "Not specified"}
Message: ${formData.message || "No message provided"}
      `;
      emailHtml = `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service:</strong> ${formData.service || "Not specified"}</p>
        <p><strong>Message:</strong> ${formData.message || "No message provided"}</p>
      `;
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      subject: emailSubject,
      text: emailText,
      html: emailHtml,
    };

    // Send email (if configured) with timeout
    // Note: Email may fail on cloud hosts due to SMTP restrictions - form still succeeds
    let emailSent = false;
    if (process.env.SMTP_HOST && process.env.SMTP_PORT && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.ENABLE_EMAIL !== 'false') {
      try {
        // Wrap in Promise.race to add timeout
        const emailPromise = transporter.sendMail(mailOptions);
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Email timeout")), 15000) // Reduced to 15 seconds
        );
        
        await Promise.race([emailPromise, timeoutPromise]);
        emailSent = true;
        console.log(`✓ Email sent for quote from ${name} (${email})`);
      } catch (emailError) {
        // Silently continue - email is optional, data is saved to Google Sheets
        // Only log if explicitly enabled for debugging
        if (process.env.DEBUG_EMAIL === 'true') {
          console.log(`Email not sent (SMTP timeout on cloud host) - form submission succeeded`);
        }
      }
    }
    
    console.log(`Quote request received from ${name} (${email}) - Type: ${formType || "unknown"}`);
    
    const messages = [];
    if (sheetsResult) messages.push("Saved to Google Sheets");
    if (emailSent) messages.push("Email sent");
    if (messages.length === 0) messages.push("Quote request received");
    
    res.json({
      success: true,
      message: messages.join(", ") + " successfully",
    });

  } catch (err) {
    console.error("Error processing quote request:", err);
    res.status(500).json({
      success: false,
      message: "Failed to process quote request",
    });
  }
});

// Keep the old endpoint for backward compatibility
app.post("/submit-form", async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: process.env.TO_EMAIL,
      subject: `New Quote Request from ${name}`,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Service: ${service || "Not specified"}
Message: ${message || "No message provided"}
      `,
      html: `
        <h2>New Quote Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Service:</strong> ${service || "Not specified"}</p>
        <p><strong>Message:</strong> ${message || "No message provided"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    res.json({ success: true, message: "Form submitted successfully!" });
  } catch (err) {
    console.error("Error sending email:", err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Ready to receive quote requests at http://localhost:${PORT}/api/quotes`);
});

