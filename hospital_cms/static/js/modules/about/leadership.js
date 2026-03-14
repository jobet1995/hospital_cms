import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class LeadershipController {
    init() {
        console.log('%c[ABOUT-LEADERSHIP]: Leadership registry syncing...', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getLeadershipTeam();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Protocol: ${meta.protocol}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Leadership manifest synchronized.');
        } catch (err) {
            console.error('[ABOUT-LEADERSHIP]: Sync deferred.', err);
            NotificationService.error('Leadership sync deferred.');
        }
    }
}
