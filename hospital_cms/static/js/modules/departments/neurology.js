import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class NeurologyController {
    init() {
        console.log('%c[DEPT-NEUROLOGY]: Brain & Nervous system unit active.', 'color: #6610f2; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getNeurology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Benchmark: ${meta.server_benchmark}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Neurology clinical manifest synced.');
        } catch (err) {
            console.error('[DEPT-NEUROLOGY]: Sync deferred.', err);
            NotificationService.error('Neurology sync deferred.');
        }
    }
}
