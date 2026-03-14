import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class VisitingConsultantsController {
    init() {
        console.log('%c[DOCTOR-VISITING]: International Visiting Board active.', 'color: #6610f2; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const data = await ApiService.getDoctorsVisiting();
            console.log(`%c[REST SUCCESS] Board Type: ${data.consultant_type} | Sync: ${data.manifest_sync}`, 'color: #28a745; font-weight: bold;');
            NotificationService.success('Visiting Consultants synchronized.');
        } catch (err) {
            console.error('[DOCTOR-VISITING]: Sync deferred.', err);
            NotificationService.error('Consultant manifest deferred.');
        }
    }
}
