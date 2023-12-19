document.addEventListener('DOMContentLoaded', function () {
    const countdownList = document.getElementById('countdownList');

    // Retrieve countdown data from local storage
    const storedCountdowns = JSON.parse(localStorage.getItem('countdowns')) || [];

    // Check if there are any countdowns
    if (storedCountdowns.length === 0) {
        // Handle the case where there are no countdowns
        console.log('No countdowns available.');
        return;
    }

    // Loop through each stored countdown
    storedCountdowns.forEach((countdown, index) => {
        // Create a list item for the countdown
        const listItem = document.createElement('li');
        const link = document.createElement('a');

        // Convert event name to uppercase
        const eventNameUppercase = countdown.eventName.toUpperCase();

        link.textContent = eventNameUppercase;
        link.href = `countdown.html?index=${index}`;

        listItem.appendChild(link);
        countdownList.appendChild(listItem);
    });
});
