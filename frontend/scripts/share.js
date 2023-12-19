function shareOnSocialMedia(platform) {
    const eventName = encodeURIComponent(document.getElementById('eventNameHeader').innerText);
    const countdownURL = encodeURIComponent(window.location.href);
    let shareURL = '';

    try {
        switch (platform) {
            case 'whatsapp':
                shareURL = `https://wa.me/?text=${eventName}%20Countdown:%20${countdownURL}`;
                break;
            case 'twitter':
                shareURL = `https://twitter.com/intent/tweet?url=${countdownURL}&text=${eventName}%20Countdown`;
                break;
            default:
                break;
        }

        if (shareURL) {
            window.open(shareURL, '_blank');
        }
    } catch (error) {
        console.error(`Error sharing on ${platform}: ${error.message}`);
        alert(`Error sharing on ${platform}. Please try again.`);
    }
}