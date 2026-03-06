document.addEventListener('DOMContentLoaded', () => {
    initTheme();
});

function initTheme() {
    // 1. Determine Default Mode of the current page
    // We assume pages are 'light' by default unless marked 'dark-default'
    const isDarkDefault = document.body.classList.contains('dark-default') ||
        document.documentElement.classList.contains('dark-default');

    // 2. Get User Preference
    const savedTheme = localStorage.getItem('theme'); // 'dark' or 'light'

    // 3. Apply Theme
    if (savedTheme) {
        applyTheme(savedTheme, isDarkDefault);
    } else {
        // Optional: Check system preference
        /*
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (systemDark && !isDarkDefault) applyTheme('dark', isDarkDefault);
        if (!systemDark && isDarkDefault) applyTheme('light', isDarkDefault);
        */
    }

    // 4. Inject Toggle Button
    if (!document.getElementById('theme-toggle')) {
        const btn = document.createElement('button');
        btn.id = 'theme-toggle';
        btn.setAttribute('aria-label', 'Toggle Dark Mode');
        btn.onclick = () => toggleTheme(isDarkDefault);

        // Icon logic
        updateToggleIcon(btn, savedTheme, isDarkDefault);

        document.body.appendChild(btn);
    }
}

function applyTheme(theme, isDarkDefault) {
    // Clean up
    document.body.classList.remove('dark-mode', 'light-mode');

    if (theme === 'dark') {
        if (!isDarkDefault) document.body.classList.add('dark-mode');
    } else if (theme === 'light') {
        if (isDarkDefault) document.body.classList.add('light-mode');
    }

    // Update button icon if exists
    const btn = document.getElementById('theme-toggle');
    if (btn) updateToggleIcon(btn, theme, isDarkDefault);
}

function toggleTheme(isDarkDefault) {
    const currentTheme = localStorage.getItem('theme');
    let newTheme = 'light'; // Default target

    if (currentTheme) {
        newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    } else {
        // If no saved theme, switch AWAY from default
        newTheme = isDarkDefault ? 'light' : 'dark';
    }

    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme, isDarkDefault);
}

function updateToggleIcon(btn, theme, isDarkDefault) {
    // If effective theme is dark, show sun. If light, show moon.
    let effectiveDark = false;

    if (theme === 'dark') effectiveDark = true;
    else if (theme === 'light') effectiveDark = false;
    else effectiveDark = isDarkDefault;

    if (effectiveDark) {
        btn.innerHTML = '<i class="fas fa-sun"></i>';
        btn.style.background = "#FFC107"; // Sun color
        btn.style.color = "#333";
    } else {
        btn.innerHTML = '<i class="fas fa-moon"></i>';
        btn.style.background = "#2D3436"; // Moon color (dark)
        btn.style.color = "#FFF";
    }
}
