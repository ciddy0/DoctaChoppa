const { ipcRenderer } = require('electron');

let selectedGender = "";

function startApp() {
    document.getElementById("start-btn").classList.add("hidden");
    document.getElementById("form-container").classList.remove("hidden");
}

function selectGender(gender) {
    selectedGender = gender;

    document.getElementById("male-btn").classList.remove("selected");
    document.getElementById("female-btn").classList.remove("selected");

    if (gender === "Male") {
        document.getElementById("male-btn").classList.add("selected");
    } else {
        document.getElementById("female-btn").classList.add("selected");
    }
}

function submitData() {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;

    // Send the user data to the main process
    ipcRenderer.send("submit-user-data", { name, age, weight, gender: selectedGender });

    // Navigate to empty.html after submitting the data
    window.location.href = "meds.html";
}

// Listen for the response from the main process (Gemini API result)
ipcRenderer.on('gemini-response', (event, responseText) => {
    const responseDiv = document.getElementById('responseText');
    
    // Check if there's an error message
    if (responseText.error) {
        responseDiv.innerText = responseText.error;
    } else {
        // Display the Gemini response
        responseDiv.innerText = responseText;
    }
});
