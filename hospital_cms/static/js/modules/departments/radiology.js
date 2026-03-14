import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class RadiologyController {
    init() {
        console.log('%c[DEPT-RADIOLOGY]: Diagnostic Imaging Hub active.', 'color: #6c757d; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getRadiology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Protocol: ${meta.protocol}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Radiology imaging records synced.');
        } catch (err) {
            console.error('[DEPT-RADIOLOGY]: Sync deferred.', err);
            NotificationService.error('Radiology sync deferred.');
        }
    }
}
