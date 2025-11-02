const express = require("express");
const axios = require("axios");
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

if (process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  authClient = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

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

    console.log(`✅ Saved to Google Sheets: ${sheetName}`);
    return true;
  } catch (err) {
    console.error("❌ Sheets Error:", err);
    return false;
  }
}

// ✅ Main submission endpoint
app.post("/api/quotes", async (req, res) => {
  const formData = req.body;
  const { name, email } = formData;

  if (!name || !email) {
    return res.status(400).json({ success: false, message: "Name and Email are required" });
  }

  console.log(`Quote from ${name} (${email}) - ${formData.formType}`);

  const sheetsSaved = await saveToSheets(formData);

  // ✅ Brevo API Email
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
    console.log(`📧 Email sent via Brevo → ${process.env.TO_EMAIL}`);
  } catch (e) {
    console.error("❌ Brevo Email Error:", e.response?.data || e.message);
  }

  res.json({
    success: true,
    message: `${emailSent ? "Email sent" : "Email skipped"}, ${sheetsSaved ? "Saved to Google Sheets" : ""}`.trim()
  });
});

// ✅ Legacy form route
app.post("/submit-form", async (req, res) => {
  req.body.formType = "general_form";
  return app._router.handle(req, res, require("http").METHODS.find(m => m === "POST"));
});

// ✅ Test endpoint
app.get("/test-api", (req, res) => {
  res.send("✅ Backend is running & Brevo API mode enabled");
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📩 Ready to receive requests at /api/quotes`);
});
