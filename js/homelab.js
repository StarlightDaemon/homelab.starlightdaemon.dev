document.addEventListener('DOMContentLoaded', () => {
    const iconMarkup = {
        menu: `
            <line x1="4" y1="6" x2="20" y2="6"></line>
            <line x1="4" y1="12" x2="20" y2="12"></line>
            <line x1="4" y1="18" x2="20" y2="18"></line>
        `,
        x: `
            <line x1="6" y1="6" x2="18" y2="18"></line>
            <line x1="18" y1="6" x2="6" y2="18"></line>
        `,
        database: `
            <ellipse cx="12" cy="5" rx="7" ry="3"></ellipse>
            <path d="M5 5v10c0 1.66 3.13 3 7 3s7-1.34 7-3V5"></path>
            <path d="M5 10c0 1.66 3.13 3 7 3s7-1.34 7-3"></path>
        `,
        'settings-2': `
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M12 2v3"></path>
            <path d="M12 19v3"></path>
            <path d="M4.93 4.93l2.12 2.12"></path>
            <path d="M16.95 16.95l2.12 2.12"></path>
            <path d="M2 12h3"></path>
            <path d="M19 12h3"></path>
            <path d="M4.93 19.07l2.12-2.12"></path>
            <path d="M16.95 7.05l2.12-2.12"></path>
        `,
        'hard-drive': `
            <rect x="3" y="7" width="18" height="10" rx="2"></rect>
            <path d="M7 11h10"></path>
            <path d="M7 14h.01"></path>
            <path d="M11 14h.01"></path>
        `,
        zap: `
            <path d="M13 2 4 14h6l-1 8 11-13h-6z"></path>
        `,
        cpu: `
            <rect x="7" y="7" width="10" height="10" rx="2"></rect>
            <path d="M9 1v3"></path>
            <path d="M15 1v3"></path>
            <path d="M9 20v3"></path>
            <path d="M15 20v3"></path>
            <path d="M20 9h3"></path>
            <path d="M20 15h3"></path>
            <path d="M1 9h3"></path>
            <path d="M1 15h3"></path>
        `,
        'refresh-cw': `
            <path d="M21 3v6h-6"></path>
            <path d="M20.49 15A9 9 0 1 1 17 5.13L21 9"></path>
        `,
        info: `
            <circle cx="12" cy="12" r="9"></circle>
            <path d="M12 11v5"></path>
            <path d="M12 8h.01"></path>
        `,
        box: `
            <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z"></path>
            <path d="M3 8l9 5 9-5"></path>
            <path d="M12 13v8"></path>
        `,
        package: `
            <path d="M21 8.5 12 3 3 8.5v7L12 21l9-5.5z"></path>
            <path d="M3 8.5 12 14l9-5.5"></path>
            <path d="M12 14V21"></path>
            <path d="M7.5 5.75 16.5 11"></path>
        `,
        network: `
            <circle cx="12" cy="5" r="2"></circle>
            <circle cx="6" cy="18" r="2"></circle>
            <circle cx="18" cy="18" r="2"></circle>
            <path d="M12 7v5"></path>
            <path d="M12 12 7.5 16"></path>
            <path d="M12 12 16.5 16"></path>
        `,
        cloud: `
            <path d="M18 18H7a4 4 0 1 1 .8-7.92A5 5 0 0 1 18 9a4.5 4.5 0 0 1 0 9Z"></path>
        `,
        'link-2': `
            <path d="M9 17H7a5 5 0 0 1 0-10h2"></path>
            <path d="M15 7h2a5 5 0 0 1 0 10h-2"></path>
            <path d="M8 12h8"></path>
        `,
        'shield-check': `
            <path d="m12 3 7 3v5c0 4.19-2.55 7.97-7 10-4.45-2.03-7-5.81-7-10V6z"></path>
            <path d="m9 12 2 2 4-4"></path>
        `
    };

    const renderIcons = (root = document) => {
        root.querySelectorAll('i[data-lucide]').forEach((iconNode) => {
            const iconName = iconNode.dataset.lucide;
            const markup = iconMarkup[iconName];

            if (!markup) {
                return;
            }

            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('class', 'lucide');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
            svg.setAttribute('aria-hidden', 'true');
            svg.innerHTML = markup;

            iconNode.replaceWith(svg);
        });
    };

    renderIcons();

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
            renderIcons(menuButton);
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
