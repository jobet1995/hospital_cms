import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class CommunityController {
    init() {
        console.log('%c[ABOUT-COMMUNITY]: Outreach and social impact engine active.', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getCommunityOutreach();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Benchmark: ${meta.server_benchmark}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Social impact data synchronized.');
        } catch (err) {
            console.error('[ABOUT-COMMUNITY]: Sync deferred.', err);
            NotificationService.error('Community sync deferred.');
        }
    }
}
