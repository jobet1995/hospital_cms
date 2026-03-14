import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class AwardsController {
    init() {
        console.log('%c[ABOUT-AWARDS]: Performance and certifications directory active.', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getAwardsCertifications();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Protocol: ${meta.protocol}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Excellence certifications synchronized.');
        } catch (err) {
            console.error('[ABOUT-AWARDS]: Sync deferred.', err);
            NotificationService.error('Awards sync deferred.');
        }
    }
}
