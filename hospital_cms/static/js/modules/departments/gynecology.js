import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class GynecologyController {
    init() {
        console.log('%c[DEPT-GYNECOLOGY]: Women\'s Health unit active.', 'color: #e83e8c; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getGynecology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Security: ${meta.security}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Gynecology clinical data synchronized.');
        } catch (err) {
            console.error('[DEPT-GYNECOLOGY]: Sync deferred.', err);
            NotificationService.error('Gynecology sync deferred.');
        }
    }
}
