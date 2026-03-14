import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class PediatricsController {
    init() {
        console.log('%c[DEPT-PEDIATRICS]: Specialized Child Care module active.', 'color: #fd7e14; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getPediatrics();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Protocol: ${meta.protocol}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Pediatrics unit records synced.');
        } catch (err) {
            console.error('[DEPT-PEDIATRICS]: Sync deferred.', err);
            NotificationService.error('Pediatrics sync deferred.');
        }
    }
}
