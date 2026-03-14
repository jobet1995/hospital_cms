import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class CareersController {
    init() {
        console.log('%c[ABOUT-CAREERS]: Medical opportunities & residency manifest active.', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getCareersInfo();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Security: ${meta.security}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Clinical career manifest synced.');
        } catch (err) {
            console.error('[ABOUT-CAREERS]: Sync deferred.', err);
            NotificationService.error('Careers manifest deferred.');
        }
    }
}
