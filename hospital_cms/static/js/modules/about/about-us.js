import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class AboutUsController {
    init() {
        console.log('%c[ABOUT-US]: Specialized sub-module active.', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getAboutGeneral();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Time: ${meta.timestamp}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('About Us records synchronized.');
        } catch (err) {
            console.error('[ABOUT-US]: Sync deferred.', err);
            NotificationService.error('About Us sync deferred.');
        }
    }
}
