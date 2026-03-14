import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class UrologyController {
    init() {
        console.log('%c[DEPT-UROLOGY]: Urinary & Renal Care manifest active.', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getUrology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Protocol: ${meta.protocol}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Urology clinical records synced.');
        } catch (err) {
            console.error('[DEPT-UROLOGY]: Sync deferred.', err);
            NotificationService.error('Urology sync deferred.');
        }
    }
}
