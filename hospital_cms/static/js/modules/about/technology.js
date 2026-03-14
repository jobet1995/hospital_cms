import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class TechnologyController {
    init() {
        console.log('%c[ABOUT-TECH]: Clinical technology & equipment audit active.', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getTechnologyEquipment();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Security: ${meta.security}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Clinical equipment inventory synced.');
        } catch (err) {
            console.error('[ABOUT-TECH]: Sync deferred.', err);
            NotificationService.error('Technology sync deferred.');
        }
    }
}
