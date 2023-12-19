// Function to update the preview section based on user selections
function updatePreview() {
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const selectedTimezone = document.getElementById('timezone').value;

    // Update the preview section
    document.getElementById('previewEventName').textContent = `${eventName}`;
    document.getElementById('previewEventDate').textContent = `${eventDate}`;
    document.getElementById('previewEventTime').textContent = `${eventTime}`;
    document.getElementById('previewTimezone').textContent = `${selectedTimezone}`;
}

// Event listeners to update preview dynamically
document.getElementById('eventName').addEventListener('input', updatePreview);
document.getElementById('eventDate').addEventListener('input', updatePreview);
document.getElementById('eventTime').addEventListener('input', updatePreview);
document.getElementById('timezone').addEventListener('input', updatePreview);

// Function to start the countdown
function startCountdown() {
    const eventName = document.getElementById('eventName').value;
    const eventDate = document.getElementById('eventDate').value;
    const eventTime = document.getElementById('eventTime').value;
    const selectedTimezone = document.getElementById('timezone').value;

    if (!eventName || !eventDate || !eventTime || !selectedTimezone) {
        alert('Please enter event name, date, time, and select a timezone.');
        return;
    }

    // Retrieve existing countdowns from local storage or initialize an empty array
    const existingCountdowns = JSON.parse(localStorage.getItem('countdowns')) || [];

    // Add the new countdown to the array
    const newCountdown = {
        eventName,
        eventDate,
        eventTime,
        selectedTimezone, // Use the correct variable name
    };

    existingCountdowns.push(newCountdown);

    // Save the updated array back to local storage
    localStorage.setItem('countdowns', JSON.stringify(existingCountdowns));

    // Show a confirmation message
    alert('Countdown started successfully!');

    // Open a new window with the countdown
    const countdownWindow = window.open('mycountdowns.html', '_blank');
}