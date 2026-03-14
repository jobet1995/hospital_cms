/**
 * Utility Functions
 */
export const Utils = {
    /**
     * Debounce function to limit execution rate
     */
    debounce: (func, wait) => {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Format date to string
     */
    formatDate: (date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(date));
    },

    /**
     * Smooth scroll to element
     */
    scrollTo: (selector, offset = 0) => {
        const element = document.querySelector(selector);
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({
                top,
                behavior: 'smooth'
            });
        }
    },

    /**
     * Get CSRF token from cookies
     */
    getCookie: (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    },

    /**
     * Simple Event Bus for inter-module communication
     */
    events: {
        events: {},
        subscribe: function(eventName, fn) {
            this.events[eventName] = this.events[eventName] || [];
            this.events[eventName].push(fn);
        },
        unsubscribe: function(eventName, fn) {
            if (this.events[eventName]) {
                this.events[eventName] = this.events[eventName].filter(f => f !== fn);
            }
        },
        publish: function(eventName, data) {
            if (this.events[eventName]) {
                this.events[eventName].forEach(fn => fn(data));
            }
        }
    }
};
