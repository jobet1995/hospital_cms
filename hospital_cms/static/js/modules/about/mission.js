import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class MissionController {
    init() {
        console.log('%c[ABOUT-MISSION]: Mission & Vision module active.', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getMissionVision();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Security: ${meta.security}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Corporate vision records synced.');
        } catch (err) {
            console.error('[ABOUT-MISSION]: Sync deferred.', err);
            NotificationService.error('Mission sync deferred.');
        }
    }
}
