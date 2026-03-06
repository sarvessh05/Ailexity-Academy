/**
 * Toast Notification System
 * Usage: Toast.show('Message text', 'success' | 'error' | 'info');
 */

const Toast = {
    init() {
        // 1. Inject CSS
        const style = document.createElement('style');
        style.textContent = `
            #toast-container {
                position: fixed;
                bottom: 20px;
                right: 20px;
                display: flex;
                flex-direction: column;
                gap: 10px;
                z-index: 9999;
            }

            .toast {
                min-width: 250px;
                background: white;
                color: #333;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                gap: 12px;
                transform: translateX(120%);
                transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                border-left: 4px solid #333;
                font-family: -apple-system, system-ui, sans-serif;
                font-size: 14px;
                font-weight: 500;
            }

            .toast.show {
                transform: translateX(0);
            }

            .toast.success { border-left-color: #2ecc71; }
            .toast.success i { color: #2ecc71; }
            
            .toast.error { border-left-color: #e74c3c; }
            .toast.error i { color: #e74c3c; }
            
            .toast.info { border-left-color: #3498db; }
            .toast.info i { color: #3498db; }
        `;
        document.head.appendChild(style);

        // 2. Create Container
        const container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
        this.container = container;
    },

    show(message, type = 'info') {
        if (!this.container) this.init();

        // Icon Selection
        let icon = 'fa-info-circle';
        if (type === 'success') icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';

        // Create Toast Element
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        // Add to DOM
        this.container.appendChild(toast);

        // Trigger Animation
        setTimeout(() => toast.classList.add('show'), 10);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
};

// Initialize on load just in case, though first call will also do it
document.addEventListener('DOMContentLoaded', () => {
    if (!document.getElementById('toast-container')) {
        Toast.init();
    }
});
