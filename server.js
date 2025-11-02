const express = require("express");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const cors = require("cors");
const axios = require("axios");


dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Google Sheets setup
let sheets = google.sheets("v4");
let authClient = null;

if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  authClient = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

// ✅ Brevo SMTP Transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,     // smtp-relay.brevo.com
  port: Number(process.env.SMTP_PORT),   // 587
  secure: false,
  auth: {
    user: process.env.SMTP_USER,   // Brevo SMTP login
    pass: process.env.SMTP_PASS,   // Brevo SMTP key
  },
  tls: {
    rejectUnauthorized: false
  }
});

// ✅ Save Form Data to Google Sheets
async function saveToSheets(formData) {
  if (!authClient || !process.env.GOOGLE_SPREADSHEET_ID) return false;

  try {
    await authClient.authorize();

    const sheetName =
      formData.formType === "construction_quote"
        ? "Construction Quotes"
        : "Landscape Quotes";

    const row = [
      new Date().toLocaleString(),
      formData.name || "",
      formData.email || "",
      formData.phone || "",
      formData.address || "",
      formData.service || formData.serviceType || "",
      formData.message || formData.projectDetails || "",
      formData.yardAreaSqft || formData.approximateSize || "",
      formData.preferredTimeline || "",
      formData.budgetRange || "",
      formData.additionalInfo || "",
      formData.mapLat && formData.mapLng
        ? `${formData.mapLat}, ${formData.mapLng}`
        : "",
    ];

    await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId: process.env.GOOGLE_SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: "USER_ENTERED",
      resource: { values: [row] },
    });

    console.log(`Saved to Sheets: ${sheetName}`);
    return true;
  } catch (err) {
    console.error("Sheets Error:", err);
    return false;
  }
}

// ✅ MAIN API ENDPOINT
app.post("/api/quotes", async (req, res) => {
  const formData = req.body;
  const { name, email } = formData;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name & Email required" });
  }

  console.log(`Quote from ${name} (${email}) - ${formData.formType}`);

  const sheetsSaved = await saveToSheets(formData);

  // Build email
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: process.env.TO_EMAIL,
    subject: `New Quote Request from ${name}`,
    html: `<h2>New Quote Request</h2><pre>${JSON.stringify(formData, null, 2)}</pre>`
  };

  let emailSent = false;
  try {
    await transporter.sendMail(mailOptions);
    emailSent = true;
    console.log(`📧 Email sent → ${email}`);
  } catch (e) {
    console.log("⚠️ Email send failed, but quote saved.");
  }

  return res.json({
    success: true,
    message: `${emailSent ? "Email sent" : "Email skipped"}, ${sheetsSaved ? "Saved to Google Sheets" : ""}`
  });
});

// ✅ BACKWARD-COMPATIBLE ROUTE
app.post("/submit-form", async (req, res) => {
  req.body.formType = "general_form";
  return app._router.handle(req, res, require("http").METHODS.find(m => m === "POST"));
});

// ✅ Test SMTP Route
app.get("/test-smtp", async (req, res) => {
  try {
    await transporter.verify();
    res.send("✅ SMTP connection successful!");
  } catch (err) {
    res.status(500).send("❌ SMTP failed: " + err.message);
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📩 Ready at http://localhost:${PORT}/api/quotes`);
});

let emailSent = false;

try {
  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: { email: process.env.TO_EMAIL, name: "Easy Landscape" },
      to: [{ email: process.env.TO_EMAIL }],
      subject: `New Quote Request from ${name}`,
      htmlContent: `<h2>New Quote Request</h2><pre>${JSON.stringify(formData, null, 2)}</pre>`
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json"
      }
    }
  );

  emailSent = true;
  console.log(`📧 Brevo API email sent → ${process.env.TO_EMAIL}`);
} catch (e) {
  console.error("⚠️ Brevo email API failed:", e.message);
}
