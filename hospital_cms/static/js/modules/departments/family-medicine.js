import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class FamilyMedicineController {
    init() {
        console.log('%c[DEPT-FAMILY]: Primary Community Care registry syncing...', 'color: #6610f2; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getFamilyMedicine();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Benchmark: ${meta.server_benchmark}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Family Medicine clinic data synced.');
        } catch (err) {
            console.error('[DEPT-FAMILY]: Sync deferred.', err);
            NotificationService.error('Family Medicine sync deferred.');
        }
    }
}
