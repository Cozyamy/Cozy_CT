document.addEventListener('DOMContentLoaded', function () {
    console.log('Countdown script loaded.');

    // Retrieve the countdown data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const countdownDateParam = urlParams.get('countdownDate');
    const eventNameParam = urlParams.get('eventName');

    if (!countdownDateParam || !eventNameParam) {
        // Handle the case where countdown data is missing or invalid
        console.error('Invalid countdown data in URL.');
        return;
    }

    const countdownDate = parseInt(countdownDateParam, 10);
    const eventName = decodeURIComponent(eventNameParam);

    // Validate the countdown data
    if (isNaN(countdownDate) || !eventName) {
        console.error('Invalid countdown data in URL.');
        return;
    }

    // Validate the event date and time
    const eventDate = new Date(countdownDate);

    if (isNaN(eventDate.getTime())) {
        console.error('Invalid event date for the shared countdown.');
        return;
    }

    // Setting Event Name in Header:
    const eventNameHeader = document.getElementById('eventNameHeader');
    eventNameHeader.innerText = eventName.toUpperCase();

    // Get the animated number elements
    const daysValue = document.getElementById('daysValue');
    const hoursValue = document.getElementById('hoursValue');
    const minutesValue = document.getElementById('minutesValue');
    const secondsValue = document.getElementById('secondsValue');

    // Update the countdown immediately and set an interval to update every second
    updateCountdown();
    setInterval(updateCountdown, 1000);

    function updateCountdown() {
        const now = new Date();
        const timeDifference = eventDate - now;

        if (timeDifference > 0) {
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

            // Update the HTML content of animated numbers
            daysValue.textContent = days.toString().padStart(2, '0');
            hoursValue.textContent = hours.toString().padStart(2, '0');
            minutesValue.textContent = minutes.toString().padStart(2, '0');
            secondsValue.textContent = seconds.toString().padStart(2, '0');
        } else {
            // If all countdown values are zero, display a message
            if (
                parseInt(daysValue.textContent, 10) === 0 &&
                parseInt(hoursValue.textContent, 10) === 0 &&
                parseInt(minutesValue.textContent, 10) === 0 &&
                parseInt(secondsValue.textContent, 10) === 0
            ) {
                // Use setTimeout to delay the display of the alert
                setTimeout(displayCountdownEndedMessage, 0);
            } else {
                // If the event has started, you can display a message or take other actions
                daysValue.textContent = '00';
                hoursValue.textContent = '00';
                minutesValue.textContent = '00';
                secondsValue.textContent = '00';
            }
        }
    }

    function displayCountdownEndedMessage() {
        // Display a confirmation dialog with a message
        const userConfirmed = window.confirm('Countdown has ended. Click OK to go back');

        // If the user clicks OK, redirect to mycountdowns.html
        if (userConfirmed) {
            window.location.href = 'mycountdowns.html';
        }
    }
});