/**
 * Footer Controller - Premium Boutique Medical Edition
 * Handles high-end interactions including AJAX newsletter subscriptions.
 */
import HospitalConfig from '../core/config.js';
import NotificationService from '../services/notification-service.js';

class FooterController {
    constructor() {
        this.$form = $('.newsletter-form');
        this.$input = this.$form.find('input');
        this.$submit = this.$form.find('.newsletter-submit');
    }

    init() {
        if (this.$form.length === 0) return;
        
        this.bindEvents();
        console.log('%c[FOOTER]: Premium Controller Active', 'color: #10b981; font-weight: bold;');
    }

    bindEvents() {
        this.$form.on('submit', (e) => {
            e.preventDefault();
            this.handleNewsletterSubmit();
        });
    }

    async handleNewsletterSubmit() {
        const email = this.$input.val();
        
        if (!email) {
            NotificationService.show('Please enter a valid email address.', 'warning');
            return;
        }

        // Visual loading state
        this.setLoading(true);

        try {
            const response = await fetch(HospitalConfig.ENDPOINTS.NEWSLETTER, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });

            const result = await response.json();

            if (result.status === 'success') {
                NotificationService.show('Welcome! You have been subscribed successfully.', 'success');
                this.$input.val('');
            } else {
                NotificationService.show(result.message || 'Subscription failed.', 'error');
            }
        } catch (error) {
            console.error('[FOOTER ERROR]:', error);
            NotificationService.show('Server connection failed. Please try again later.', 'error');
        } finally {
            this.setLoading(false);
        }
    }

    setLoading(state) {
        if (state) {
            this.$submit.html('<i class="fas fa-spinner fa-spin"></i>');
            this.$submit.prop('disabled', true);
        } else {
            this.$submit.html('<i class="fas fa-paper-plane"></i>');
            this.$submit.prop('disabled', false);
        }
    }
}

export default FooterController;
