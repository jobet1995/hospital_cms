import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class DermatologyController {
    init() {
        console.log('%c[DEPT-DERMATOLOGY]: Skin & Aesthetic care manifest active.', 'color: #e83e8c; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getDermatology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Security: ${meta.security}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Dermatology clinical data synced.');
        } catch (err) {
            console.error('[DEPT-DERMATOLOGY]: Sync deferred.', err);
            NotificationService.error('Dermatology sync deferred.');
        }
    }
}
