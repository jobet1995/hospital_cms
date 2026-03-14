import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class PsychiatryController {
    init() {
        console.log('%c[DEPT-PSYCHIATRY]: Mental Health & Wellness Center active.', 'color: #6610f2; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getPsychiatry();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Security: ${meta.security}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Psychiatry clinical data synchronized.');
        } catch (err) {
            console.error('[DEPT-PSYCHIATRY]: Sync deferred.', err);
            NotificationService.error('Psychiatry sync deferred.');
        }
    }
}
