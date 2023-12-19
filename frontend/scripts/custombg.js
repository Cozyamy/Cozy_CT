const bgColorInput = document.getElementById('bgColor');
const countdownContainer = document.getElementById('countdownContainer');
const cancelBtn = document.getElementById('cancelBtn');

let originalBgColor;

function applyBackgroundChanges() {
    const bgColor = bgColorInput.value;

    // Apply background color
    countdownContainer.style.backgroundColor = bgColor;
    localStorage.setItem('bgColor', bgColor);
}

function cancelChanges() {
    // Reset inputs to their original values
    bgColorInput.value = originalBgColor;

    // Apply original values
    applyBackgroundChanges();
}

document.addEventListener('DOMContentLoaded', function () {
    originalBgColor = localStorage.getItem('bgColor');

    if (originalBgColor) {
        bgColorInput.value = originalBgColor;
        countdownContainer.style.backgroundColor = originalBgColor;
    }

    applyBackgroundChanges(); // Apply any saved settings
});

bgColorInput.addEventListener('input', function () {
    applyBackgroundChanges();
});

cancelBtn.addEventListener('click', cancelChanges);