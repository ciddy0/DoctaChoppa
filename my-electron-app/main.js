const { app, BrowserWindow, ipcMain } = require('electron');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load environment variables from .env file

let userData = {};
let medicationData = {};

// Access the API key securely from the environment variable
const apiKey = process.env.GOOGLE_API_KEY;
if (!apiKey) {
    console.error('API key is missing! Please set the GOOGLE_API_KEY in your .env file.');
    app.quit();
}

const genAI = new GoogleGenerativeAI(apiKey); // Initialize with the API key from .env
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

function createWindow() {
    const win = new BrowserWindow({
        width: 600,
        height: 400,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });

    win.loadFile('start.html');  // The initial page is start.html
}

// Listen for the first set of user data (name, age, weight, gender)
ipcMain.on('submit-user-data', (event, data) => {
    userData = data;  // Store the user data
    console.log('User Data:', userData);
});

// Listen for the second set of data (medication, allergies)
ipcMain.on('submit-medication-allergies', async (event, data) => {
    medicationData = data;  // Store the medication data
    console.log('Medication Data:', medicationData);

    // Combine both sets of data
    const combinedData = { ...userData, ...medicationData };
    console.log('Combined Data:', combinedData);

    // Construct a prompt for Gemini to check for medication/allergy conflicts
    const prompt = `
        User Details: Name: ${userData.name}, Age: ${userData.age}, Gender: ${userData.gender}.
        Medication: ${medicationData.medication}.
        Allergies: ${medicationData.allergies}.
        Please check if there are any conflicts between these medications and allergies and check for drug interaction risks.
        No need to include a whole analysis just do a simple and short report.
    `;

    try {
        // Request content from Gemini
        console.log(prompt)
        const result = await model.generateContent(prompt);

        // Extract the response text (ensure to call the text() function to get the string content)
        const responseText = result.response.text();
        console.log(responseText)
        // Now send the response text back to the renderer process
        event.sender.send('gemini-response', responseText);
    } catch (error) {
        console.error('Error generating content from Gemini API:', error);
        event.sender.send('gemini-response', { error: 'Error checking for conflicts.' });
    }
});

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
