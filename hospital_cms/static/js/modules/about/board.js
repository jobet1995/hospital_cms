import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class BoardController {
    init() {
        console.log('%c[ABOUT-BOARD]: Board of Directors manifest active.', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getBoardOfDirectors();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Status: ENTERPRISE_VAL`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Board of Directors logs synced.');
        } catch (err) {
            console.error('[ABOUT-BOARD]: Sync deferred.', err);
            NotificationService.error('Board sync deferred.');
        }
    }
}
