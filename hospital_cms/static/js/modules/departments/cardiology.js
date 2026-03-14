import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class CardiologyController {
    init() {
        console.log('%c[DEPT-CARDIOLOGY]: Heart & Vascular center active.', 'color: #dc3545; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getCardiology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Security: ${meta.security}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Cardiology clinical data synced.');
        } catch (err) {
            console.error('[DEPT-CARDIOLOGY]: Sync deferred.', err);
            NotificationService.error('Cardiology sync deferred.');
        }
    }
}
