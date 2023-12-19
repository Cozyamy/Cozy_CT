document.addEventListener('DOMContentLoaded', function () {
    const userMode = localStorage.getItem('mode');

    if (userMode === 'dark') {
        enableDarkMode();
    }

    const modeToggleBtn = document.getElementById('modeToggle');
    const mobileModeToggleBtn = document.getElementById('mobileModeToggle');

    modeToggleBtn.addEventListener('click', toggleMode);
    mobileModeToggleBtn.addEventListener('click', toggleMode);
});

function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');

    const userMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('mode', userMode);
}

function enableDarkMode() {
    document.body.classList.add('dark-mode');
}
