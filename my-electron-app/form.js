const { ipcRenderer } = require('electron');

        // Fetch the data when the page loads
        ipcRenderer.invoke('get-user-data').then(data => {
            // Display the data in the appropriate elements
            document.getElementById("name").innerText = data.name || "N/A";
            document.getElementById("age").innerText = data.age || "N/A";
            document.getElementById("weight").innerText = data.weight || "N/A";
            document.getElementById("gender").innerText = data.gender || "N/A";
        });