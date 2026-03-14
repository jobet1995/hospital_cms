import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class DentistryController {
    init() {
        console.log('%c[DEPT-DENTISTRY]: Oral Health Center manifest active.', 'color: #20c997; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getDentistry();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Protocol: ${meta.protocol}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Dentistry clinical records synced.');
        } catch (err) {
            console.error('[DEPT-DENTISTRY]: Sync deferred.', err);
            NotificationService.error('Dentistry sync deferred.');
        }
    }
}
