import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class EmergencyController {
    init() {
        console.log('%c[DEPT-EMERGENCY]: 24/7 Critical Care manifest active.', 'color: #dc3545; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getEmergencyMedicine();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Security: ${meta.security}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Emergency unit manifest synchronized.');
        } catch (err) {
            console.error('[DEPT-EMERGENCY]: Sync deferred.', err);
            NotificationService.error('Emergency sync deferred.');
        }
    }
}
