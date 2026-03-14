import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class RehabilitationController {
    init() {
        console.log('%c[DEPT-REHAB]: Restorative Therapy manifest active.', 'color: #20c997; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getRehabilitation();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Status: RESTORATION_READY`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Rehabilitation records synchronized.');
        } catch (err) {
            console.error('[DEPT-REHAB]: Sync deferred.', err);
            NotificationService.error('Rehabilitation sync deferred.');
        }
    }
}
