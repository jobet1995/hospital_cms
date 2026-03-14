import ApiService from '../services/api-service.js';
import ContactFormController from '../forms/contact-form.js';

class ContactController {
    constructor() {
        this.form = new ContactFormController();
    }

    init() {
        console.log('[CONTACT]: Initializing communication and feedback module...');
        if ($('.contact-form').length) this.form.init();
        
        this.fetchContactMetadata();
    }

    async fetchContactMetadata() {
        try {
            console.log('[CONTACT]: Fetching situational alerts and metadata...');
            // Reusing emergency alerts for situational contact context
            const alerts = await ApiService.getEmergencyAlerts();
            if (alerts) {
                console.log('[CONTACT]: Situational data sync successful.', alerts);
            }
        } catch (err) {
            console.warn('[CONTACT]: Situational sync deferred.', err);
        }
    }
}

export default ContactController;
