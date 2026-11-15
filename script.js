document.addEventListener('DOMContentLoaded', () => {
    /* MENU MOBILE */
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileMenuBtn && navMenu) {
        const toggleMenu = (forceClose = false) => {
            const isOpen = forceClose ? false : !navMenu.classList.contains('active');

            navMenu.classList.toggle('active', isOpen);
            mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
            mobileMenuBtn.setAttribute(
                'aria-label',
                isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
            );

            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars', !isOpen);
                icon.classList.toggle('fa-xmark', isOpen);
            }
        };

        mobileMenuBtn.addEventListener('click', () => toggleMenu());

        navLinks.forEach((link) => {
            link.addEventListener('click', () => toggleMenu(true));
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                toggleMenu(true);
                mobileMenuBtn.focus();
            }
        });
    }
});