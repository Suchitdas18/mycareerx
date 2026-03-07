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

// The ID from the URL of your Google Sheet for Students
const SPREADSHEET_ID = '1vjozZtj_G2Mj1PXP3I610ekuvvpJaYSe7ue_kymrQwg'; 

// The ID from the URL of your Google Sheet for Mentors
const MENTORS_SPREADSHEET_ID = '1AcjBb7LItvK_UZmHUsCj7bJw4d8Pjlxl1FHS65bsZIE'; 

// The ID from the URL of your Google Sheet for Inquiries ("Know More")
const INQUIRY_SPREADSHEET_ID = '1vB2J5fC1hI-9nAeNv7kb8EC3TiCMiLkFYDij_msLPd8';

// Setup Google Auth (Check Vercel env variable first, then fallback to local file)
let sheets = null;
try {
    if (process.env.VERCEL && !process.env.GOOGLE_CREDENTIALS) {
        throw new Error("Missing GOOGLE_CREDENTIALS in Vercel. You must add the JSON content to the Environment Variables in Vercel settings and then Redeploy.");
    }

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

// Endpoint to handle booking form submissions (Students)
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

// Endpoint to handle mentor applications
app.post('/api/mentor', async (req, res) => {
    try {
        if (MENTORS_SPREADSHEET_ID === 'PLACEHOLDER_MENTOR_SHEET_ID') {
            return res.status(500).json({ success: false, message: 'Backend has not updated MENTORS_SPREADSHEET_ID config yet!' });
        }

        const { name, org, domain, exp, rate, phone, bio } = req.body;

        if (!name || !org || !phone || !bio) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        const newRow = [
            new Date().toLocaleString(), // Timestamp
            name,
            org,
            domain,
            exp,
            rate,
            phone,
            bio,
            'Pending Review' // Status Column
        ];

        if (!sheets) {
            return res.json({ success: true, message: 'Mentor saved locally! (Google Sheets setup required)' });
        }

        await sheets.spreadsheets.values.append({
            spreadsheetId: MENTORS_SPREADSHEET_ID,
            range: 'Sheet1!A:I', 
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: [newRow] },
        });

        res.json({ success: true, message: 'Mentor application saved securely!' });
    } catch (error) {
        console.error('Error saving mentor app:', error);
        res.status(500).json({ success: false, message: 'Failed to save to Mentor database.' });
    }
});

// Endpoint to handle University Inquiry tracking 
app.post('/api/inquiry', async (req, res) => {
    try {
        const { name, phone, college } = req.body;

        if (!name || !phone) {
            return res.status(400).json({ success: false, message: 'Name and Phone are required' });
        }

        const newRow = [
            new Date().toLocaleString(), // Timestamp
            name,
            phone,
            college || 'Not Specified',
            'Pending Contact'
        ];

        if (!sheets) {
            return res.json({ success: true, message: 'Inquiry saved locally! (Google Sheets setup required)' });
        }

        await sheets.spreadsheets.values.append({
            spreadsheetId: INQUIRY_SPREADSHEET_ID,
            range: 'Sheet1!A:E', 
            valueInputOption: 'USER_ENTERED',
            requestBody: { values: [newRow] },
        });

        res.json({ success: true, message: 'Inquiry recorded securely!' });
    } catch (error) {
        console.error('Error saving inquiry:', error);
        res.status(500).json({ success: false, message: 'Failed to record inquiry.' });
    }
});

// Endpoint to fetch bookings for the Admin Dashboard securely
app.get('/api/bookings', async (req, res) => {
    try {
        // Simple password protection Check
        const token = req.query.token;
        const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'secret123';
        
        if (token !== ADMIN_PASS) {
            return res.status(401).json({ success: false, message: 'Unauthorized: Incorrect Password' });
        }

        if (!sheets) {
            return res.status(500).json({ success: false, message: 'Google Sheets not initialized yet' });
        }

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A:K',
        });

        res.json({ success: true, data: response.data.values || [] });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch data' });
    }
});

// Endpoint to fetch mentor apps for Admin
app.get('/api/mentors_list', async (req, res) => {
    try {
        const token = req.query.token;
        const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'secret123';
        if (token !== ADMIN_PASS) return res.status(401).json({ success: false, message: 'Unauthorized' });

        if (MENTORS_SPREADSHEET_ID === 'PLACEHOLDER_MENTOR_SHEET_ID') {
            return res.json({ success: true, data: [] }); // Returning empty if not setup so page doesn't crash
        }

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: MENTORS_SPREADSHEET_ID,
            range: 'Sheet1!A:I',
        });

        res.json({ success: true, data: response.data.values || [] });
    } catch (error) {
        console.error('Error fetching mentors:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch data' });
    }
});

// Admin Operations Endpoint (Edit, Delete, Manage)
app.post('/api/admin/action', async (req, res) => {
    try {
        const { token, action, type, rowIndex, rowData } = req.body;
        const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'secret123';
        
        if (token !== ADMIN_PASS) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }
        if (!sheets) {
            return res.status(500).json({ success: false, message: 'Google Sheets not initialized yet' });
        }

        const spreadsheetId = type === 'student' ? SPREADSHEET_ID : MENTORS_SPREADSHEET_ID;
        const range = type === 'student' ? `Sheet1!A${rowIndex}:K${rowIndex}` : `Sheet1!A${rowIndex}:I${rowIndex}`;

        if (action === 'delete') {
            // Full Row Deletion via batchUpdate pushes lower rows up correctly
            const sheetMetadata = await sheets.spreadsheets.get({ spreadsheetId });
            const sheet = sheetMetadata.data.sheets.find(s => s.properties.title === 'Sheet1');
            const sheetId = sheet ? sheet.properties.sheetId : 0; // fallback to 0

            await sheets.spreadsheets.batchUpdate({
                spreadsheetId,
                requestBody: {
                    requests: [
                        {
                            deleteDimension: {
                                range: {
                                    sheetId: sheetId,
                                    dimension: 'ROWS',
                                    startIndex: rowIndex - 1, // 0-indexed API
                                    endIndex: rowIndex
                                }
                            }
                        }
                    ]
                }
            });
        } else if (action === 'update') {
            // Overwrite row cells with new edited inputs
            await sheets.spreadsheets.values.update({
                spreadsheetId,
                range,
                valueInputOption: 'USER_ENTERED',
                requestBody: {
                    values: [rowData]
                }
            });
        }

        res.json({ success: true, message: 'Success' });
    } catch (error) {
        console.error('Error executing admin action:', error);
        res.status(500).json({ success: false, message: 'Failed to complete action' });
    }
});

// Get Public Mentors (Only Approved)
app.get('/api/public/mentors', async (req, res) => {
    try {
        if (!sheets) return res.json({ success: false, data: [] });
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: MENTORS_SPREADSHEET_ID,
            range: 'Sheet1!A:I'
        });
        const rows = response.data.values || [];
        // Only return rows where column index 8 includes 'approv'
        const approved = rows.filter((row, i) => i > 0 && row[8] && row[8].toLowerCase().includes('approv'));
        
        // Strip out private data like phone numbers
        const safeData = approved.map(row => ({
            name: row[1] || 'Mentor',
            org: row[2] || '',
            domain: row[3] || '',
            exp: row[4] || '',
            rate: row[5] || '0',
            bio: row[7] || ''
        }));

        res.json({ success: true, data: safeData });
    } catch (error) {
        console.error('Error fetching public mentors:', error);
        res.status(500).json({ success: false, data: [] });
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
