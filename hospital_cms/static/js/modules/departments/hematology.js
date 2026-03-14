import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class HematologyController {
    init() {
        console.log('%c[DEPT-HEMATOLOGY]: Blood Disorders Center active.', 'color: #dc3545; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getHematology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Benchmark: ${meta.server_benchmark}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Hematology clinical manifest synced.');
        } catch (err) {
            console.error('[DEPT-HEMATOLOGY]: Sync deferred.', err);
            NotificationService.error('Hematology sync deferred.');
        }
    }
}
