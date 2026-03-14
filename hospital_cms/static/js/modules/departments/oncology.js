import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class OncologyController {
    init() {
        console.log('%c[DEPT-ONCOLOGY]: Cancer Treatment Center data sync...', 'color: #fd7e14; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getOncology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Protocol: ${meta.protocol}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Oncology unit records synchronized.');
        } catch (err) {
            console.error('[DEPT-ONCOLOGY]: Sync deferred.', err);
            NotificationService.error('Oncology sync deferred.');
        }
    }
}
