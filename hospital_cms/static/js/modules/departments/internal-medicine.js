import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class InternalMedicineController {
    init() {
        console.log('%c[DEPT-INTERNAL]: Adult Comprehensive Care unit active.', 'color: #198754; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getInternalMedicine();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Security: ${meta.security}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Internal Medicine records synced.');
        } catch (err) {
            console.error('[DEPT-INTERNAL]: Sync deferred.', err);
            NotificationService.error('Internal Medicine sync deferred.');
        }
    }
}
