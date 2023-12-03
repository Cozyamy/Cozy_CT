document.addEventListener("DOMContentLoaded", function () {
  let countdownDate = 0;
  let eventName = "";

  // Check if countdown data is available in the URL parameters
  const params = new URLSearchParams(window.location.search);
  const sharedCountdownDate = params.get('countdownDate');
  const sharedEventName = params.get('eventName');

  if (sharedCountdownDate && sharedEventName) {
    // Use the countdown data from the URL parameters
    countdownDate = parseInt(sharedCountdownDate, 10);
    eventName = sharedEventName;
  } else {
    // If no countdown data in the URL, check if saved event data exists in local storage
    const savedEvent = JSON.parse(localStorage.getItem("countdownEvent"));

    if (savedEvent) {
      // If there's a saved event, use its date
      countdownDate = new Date(savedEvent.date).getTime();
      eventName = savedEvent.name;

      // Populate input fields with saved data (for the index page)
      document.getElementById("event-name-input").value = eventName;
      document.getElementById("event-date-input").valueAsDate = new Date(savedEvent.date);

      // Update the displayed event name (for the index page)
      document.getElementById("event-name").innerText = eventName;

      // Start the countdown (for the index page)
      startCountdown();
    }
  }

  // Save button functionality (for the index page)
  const saveButton = document.getElementById("save-button");

  saveButton.addEventListener("click", function () {
    const newEventName = document.getElementById("event-name-input").value;
    const newEventDate = document.getElementById("event-date-input").value;

    if (newEventName && newEventDate) {
      // Save the new event data to local storage
      const newEvent = {
        name: newEventName,
        date: newEventDate,
      };

      localStorage.setItem("countdownEvent", JSON.stringify(newEvent));

      // Update the displayed event name (for the index page)
      document.getElementById("event-name").innerText = newEventName;

      // Update the countdown with the new date (for the index page)
      countdownDate = new Date(newEventDate).getTime();

      // Start the countdown (for the index page)
      startCountdown();
    } else {
      alert("Please enter both event name and date.");
    }
  });

  // Social media sharing buttons functionality
  const facebookButton = document.getElementById("facebook-button");
  const twitterButton = document.getElementById("twitter-button");
  const linkedinButton = document.getElementById("linkedin-button");
  const whatsappButton = document.getElementById("whatsapp-button");

  facebookButton.addEventListener("click", function () {
    shareOnSocialMedia("facebook");
  });

  twitterButton.addEventListener("click", function () {
    shareOnSocialMedia("twitter");
  });

  linkedinButton.addEventListener("click", function () {
    shareOnSocialMedia("linkedin");
  });

  whatsappButton.addEventListener("click", function () {
    shareOnSocialMedia("whatsapp");
  });

  function shareOnSocialMedia(platform) {
    const shareText = `Countdown to ${eventName}: ${document.getElementById("countdown").innerText}`;
    const pageUrl = window.location.href;
    let shareUrl = '';

    try {
      switch (platform) {
        case 'facebook':
          shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(shareText)}`;
          break;
        case 'twitter':
          shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}`;
          break;
        case 'linkedin':
          shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(shareText)}`;
          break;
        case 'whatsapp':
          // Create a WhatsApp share link with the current countdown data and message
          shareUrl = `whatsapp://send?text=${encodeURIComponent(`${shareText} - ${pageUrl}?countdownDate=${countdownDate}&eventName=${eventName}`)}`;
          break;
        default:
          break;
      }

      if (shareUrl) {
        window.open(shareUrl, "_blank");
      }
    } catch (error) {
      console.error(`Error sharing on ${platform}: ${error.message}`);
      alert(`Error sharing on ${platform}. Please try again.`);
    }
  }

  function startCountdown() {
    // Update the countdown every second only if a valid countdownDate is set
    setInterval(function () {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      if (distance <= 0) {
        // If countdown has reached zero, display congratulatory message below countdown
        document.getElementById("countdown").innerHTML = "Countdown Complete!";
        document.getElementById("congratulatory-message").style.display = "block";

        // Optionally, you can clear the local storage to reset the countdown for future events
        localStorage.removeItem("countdownEvent");
      } else {
        // If countdown is still ongoing, calculate and display the remaining time
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the countdown
        document.getElementById("countdown").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      }
    }, 1000);
  }

  // Start the countdown if there is a valid countdownDate
  if (countdownDate > 0) {
    startCountdown();
  }
});