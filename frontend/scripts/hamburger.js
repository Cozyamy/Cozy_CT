document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuCheckbox = document.getElementById('mobile-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav a');

    // Toggle the mobile menu on checkbox change
    mobileMenuCheckbox.addEventListener('change', function () {
        mobileNav.style.display = this.checked ? 'flex' : 'none';
    });

    // Close the mobile menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenuCheckbox.checked = false;
            mobileNav.style.display = 'none';
        });
    });
});
