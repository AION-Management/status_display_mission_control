import { getStatusUpdates } from "./firebaseService.js";

// Function to determine color based on status
function getStatusColor(status) {
    switch (status.toLowerCase()) {
        case "green":
            return "#00CC00"; // Light green
        case "yellow":
            return "#DCDC25"; // Light yellow
        case "red":
            return "#E81C1C"; // Light red
        case "select a status":
            return "#000000";   // Default color
    }
}

function displayStatusUpdates() {
    const applications = ['realpage', 'gracehill', 'outlook', 'ticket'];

    applications.forEach(appId => {
        getStatusUpdates(appId, (data) => {
            if (data) {
                // Get the display elements
                const statusElement = document.getElementById(`${appId}-status-display`);
                const textElement = document.getElementById(`${appId}-text-display`);

                // Update the text content
                statusElement.textContent = data.status;
                textElement.textContent = data.errormsg;

                // Apply the color to the status element
                const color = getStatusColor(data.status);
                statusElement.style.backgroundColor = color;
            } else {
                console.log(`No data available for ${appId}`);
            }
        });
    });
}

// Call the function on page load
window.onload = displayStatusUpdates;