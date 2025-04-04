# Medicine Checker Featuring Choppper

An intelligent desktop application that helps users review their medications and allergies using Google's Gemini AI. Built with Electron, this app collects personal medical info, sends it to Gemini for analysis, and displays a friendly, AI-generated health summary.

## Features
- User-friendly form to input:
  - Name, age, gender, weight
  - Current medications
  - Known Allergies
- AI-powered medical summary generation via Gemini
- Two choices:
  - **Standard Medication Report**
  - **Cheaper Alternative to medication**
- Simple, lightweigth dekstop interface

## Built with

- [Electron](https://www.electronjs.org/) – for building the cross-platform desktop UI
- [Google Gemini API](https://ai.google.dev/) – to generate smart, context-aware medication reports
- HTML, CSS, JavaScript (Vanilla) – for the UI

## How it works

1. User opens the app and enters basic info.
2. They’re prompted to input medication and allergy data.
3. The app sends this data to Gemini for a health summary.
4. The summary is rendered in the `report.html` page.

## Setup
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/medcheck-ai.git
   cd medcheck-ai```
3. Install dependecies
    ```bash
    npm install
    ```
5. Add your Gemini API key
6. Run the app
   ```bash
   npm start
   ```
## Disclaimer!
> This app is not a medical device and should not replace professional medical advice. Always consult a healthcare provider before making changes to your medication or treatment.

## License
This project is licensed under the MIT License
