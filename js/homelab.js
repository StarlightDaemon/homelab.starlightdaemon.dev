document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide && typeof window.lucide.createIcons === 'function') {
        window.lucide.createIcons();
    }

    const yearTarget = document.getElementById('labYear');
    if (yearTarget) {
        yearTarget.textContent = new Date().getFullYear();
    }

    const menuButton = document.querySelector('.lab-menu-button');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuButton && mobileMenu) {
        const setMenuState = (isOpen) => {
            menuButton.setAttribute('aria-expanded', String(isOpen));
            mobileMenu.hidden = !isOpen;
            mobileMenu.classList.toggle('is-open', isOpen);

            menuButton.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}"></i>`;

            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            }
        };

        setMenuState(false);

        menuButton.addEventListener('click', () => {
            const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
            setMenuState(!isOpen);
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => setMenuState(false));
        });
    }

    const tabs = document.querySelectorAll('[data-tab-target]');
    const panels = document.querySelectorAll('[data-tab-panel]');

    const activateTab = (target) => {
        tabs.forEach((tab) => {
            const isActive = tab.dataset.tabTarget === target;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-selected', String(isActive));
        });

        panels.forEach((panel) => {
            const isActive = panel.dataset.tabPanel === target;
            panel.classList.toggle('is-active', isActive);
            panel.hidden = !isActive;
        });
    };

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => activateTab(tab.dataset.tabTarget));
    });

    activateTab('movies');
});
