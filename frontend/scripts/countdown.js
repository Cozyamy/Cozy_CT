document.addEventListener('DOMContentLoaded', function () {
    console.log('Countdown script loaded.');

    // Retrieve the index parameter from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const indexParam = urlParams.get('index');
    console.log('Index parameter:', indexParam);

    if (indexParam === null || isNaN(indexParam)) {
        // Handle the case where the index parameter is missing or invalid
        console.error('Invalid index parameter.');
        return;
    }

    const storedCountdowns = JSON.parse(localStorage.getItem('countdowns')) || [];

    // Validate the index parameter
    if (indexParam < 0 || indexParam >= storedCountdowns.length) {
        // Handle the case where the index parameter is out of bounds
        console.error('Index out of bounds.');
        return;
    }

    const selectedCountdown = storedCountdowns[indexParam];
    console.log('Selected countdown data:', selectedCountdown);

    // Validate the selected countdown data
    if (!selectedCountdown.eventName || !selectedCountdown.eventDate) {
        // Handle the case where data is missing or incomplete for the selected countdown
        console.error('Selected countdown data is missing or incomplete.');
        return;
    }

    let eventDate = new Date(selectedCountdown.eventDate);  // Variable to store the event date

    // Check if the event date is for the same day
    const isSameDayEvent = isSameDay(new Date(), eventDate);

    // If it's a same-day event and the event time is in the past, adjust the eventDate to tomorrow
    if (isSameDayEvent && eventDate.getTime() < new Date().getTime()) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        eventDate = tomorrow;
    }

    // Setting Event Name in Header:
    const eventNameHeader = document.getElementById('eventNameHeader');
    eventNameHeader.innerText = selectedCountdown.eventName.toUpperCase();

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

    // Function to check if two dates are on the same day
    function isSameDay(date1, date2) {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    }
});
