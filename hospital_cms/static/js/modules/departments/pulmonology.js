import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class PulmonologyController {
    init() {
        console.log('%c[DEPT-PULMONOLOGY]: Respiratory Medicine unit active.', 'color: #0dcaf0; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getPulmonology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Benchmark: ${meta.server_benchmark}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Pulmonology clinical manifest synced.');
        } catch (err) {
            console.error('[DEPT-PULMONOLOGY]: Sync deferred.', err);
            NotificationService.error('Pulmonology sync deferred.');
        }
    }
}
