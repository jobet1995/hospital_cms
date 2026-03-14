import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class OrthopedicsController {
    init() {
        console.log('%c[DEPT-ORTHOPEDICS]: Bone & Joint health registry syncing...', 'color: #20c997; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getOrthopedics();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Status: CLINICAL_READY`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Orthopedics facility logs synced.');
        } catch (err) {
            console.error('[DEPT-ORTHOPEDICS]: Sync deferred.', err);
            NotificationService.error('Orthopedics sync deferred.');
        }
    }
}
