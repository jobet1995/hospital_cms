import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class GastroenterologyController {
    init() {
        console.log('%c[DEPT-GASTRO]: Digestive Health system active.', 'color: #198754; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getGastroenterology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Benchmark: ${meta.server_benchmark}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Gastroenterology clinical data synced.');
        } catch (err) {
            console.error('[DEPT-GASTRO]: Sync deferred.', err);
            NotificationService.error('Gastroenterology sync deferred.');
        }
    }
}
