import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class OphthalmologyController {
    init() {
        console.log('%c[DEPT-OPHTHALMOLOGY]: Eye & Vision Center syncing...', 'color: #0dcaf0; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getOphthalmology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Benchmark: ${meta.server_benchmark}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Ophthalmology clinical manifest synced.');
        } catch (err) {
            console.error('[DEPT-OPHTHALMOLOGY]: Sync deferred.', err);
            NotificationService.error('Ophthalmology sync deferred.');
        }
    }
}
