const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { google } = require('googleapis');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); 

// Google Sheets Configuration
// You will need to replace these placeholders with your actual credentials later
const GOOGLE_SHEETS_CREDENTIALS = {
  // Add your service account JSON contents here later
};

// The ID from the URL of your Google Sheet
const SPREADSHEET_ID = '1vjozZtj_G2Mj1PXP3I610ekuvvpJaYSe7ue_kymrQwg'; 

// Setup Google Auth (Check Vercel env variable first, then fallback to local file)
let sheets = null;
try {
    if (process.env.GOOGLE_CREDENTIALS) {
        // We are on Vercel
        let creds = process.env.GOOGLE_CREDENTIALS;
        if (typeof creds === 'string') {
            creds = JSON.parse(creds);
        }
            
        // Fix for Vercel escaping literal newlines in the private key string
        if (creds.private_key) {
            creds.private_key = creds.private_key.replace(/\\n/g, '\n');
        }
        
        const auth = new google.auth.GoogleAuth({
            credentials: creds,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        sheets = google.sheets({ version: 'v4', auth });
        console.log("✅ Google Auth initialized using Vercel Environment Variables");

    } else {
        // We are testing locally
        const auth = new google.auth.GoogleAuth({
            keyFile: './credentials.json',
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        sheets = google.sheets({ version: 'v4', auth });
        console.log("✅ Google Auth initialized using local credentials.json file");
    }

} catch (error) {
    console.error("⚠️ Google Sheets setup error:", error.message);
}

// Endpoint to handle booking form submissions
app.post('/api/book', async (req, res) => {
    try {
        const {
            name,
            schoolName,
            primaryNumber,
            secondaryNumber,
            email,
            tenthPercent,
            twelfthPercent,
            appointmentDate,
            sessionType,
            mentorRequired
        } = req.body;

        // Basic validation
        if (!name || !schoolName || !primaryNumber || !tenthPercent || !appointmentDate) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        // Format the row data exactly as it will appear in Google Sheets
        const newRow = [
            new Date().toLocaleString(), // Timestamp
            name,
            schoolName,
            primaryNumber,
            secondaryNumber || 'N/A',
            email || 'N/A',
            tenthPercent,
            twelfthPercent || 'N/A',
            appointmentDate,
            sessionType,
            mentorRequired || 'Any'
        ];

        // If Sheets API isn't setup yet, we just log it (useful for local testing)
        if (!sheets) {
            console.log("\n--- NEW BOOKING RECEIVED (Not sent to Google Sheets yet) ---");
            console.log(newRow);
            console.log("------------------------------------------------------------\n");
            return res.json({ 
                success: true, 
                message: 'Booking saved locally! (Google Sheets setup required)' 
            });
        }

        // Append data to Google Sheets
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:K', // Ensure your sheet is named 'Sheet1'
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [newRow],
            },
        });

        res.json({ success: true, message: 'Booking saved to Google Sheets successfully' });
    } catch (error) {
        console.error('Error saving booking to Google Sheets:', error);
        res.status(500).json({ success: false, message: 'Failed to save to database. Error: ' + (error.message || error) });
    }
});

if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
        console.log(`Open http://localhost:${PORT}/index.html in your browser.`);
    });
}

// Required for Vercel
module.exports = app;
