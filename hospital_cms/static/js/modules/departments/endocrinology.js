import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class EndocrinologyController {
    init() {
        console.log('%c[DEPT-ENDOCRINOLOGY]: Metabolic & Hormonal Health hub active.', 'color: #fd7e14; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getEndocrinology();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Protocol: ${meta.protocol}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Endocrinology clinical records synced.');
        } catch (err) {
            console.error('[DEPT-ENDOCRINOLOGY]: Sync deferred.', err);
            NotificationService.error('Endocrinology sync deferred.');
        }
    }
}
