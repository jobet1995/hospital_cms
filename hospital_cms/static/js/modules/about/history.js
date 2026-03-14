import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class HistoryController {
    init() {
        console.log('%c[ABOUT-HISTORY]: Historical data engine active.', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getHospitalHistory();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Benchmark: ${meta.server_benchmark}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Historical archives synchronized.');
        } catch (err) {
            console.error('[ABOUT-HISTORY]: Sync deferred.', err);
            NotificationService.error('History sync deferred.');
        }
    }
}
