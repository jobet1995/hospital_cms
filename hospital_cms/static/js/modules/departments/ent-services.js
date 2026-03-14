import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class EntServicesController {
    init() {
        console.log('%c[DEPT-ENT]: Otolaryngology Specialists manifest active.', 'color: #ffc107; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getEntServices();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Status: OTOLARYNGOLOGY_READY`, 'color: #198754; font-weight: bold;');
            NotificationService.success('ENT Services clinical data synced.');
        } catch (err) {
            console.error('[DEPT-ENT]: Sync deferred.', err);
            NotificationService.error('ENT Services sync deferred.');
        }
    }
}
