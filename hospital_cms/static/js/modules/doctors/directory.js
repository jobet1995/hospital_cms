import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class DoctorDirectoryController {
    init() {
        console.log('%c[DOCTOR-DIRECTORY]: Physician Manifest active.', 'color: #007bff; font-weight: bold; font-size: 1.1em;');
        this.fetchDirectory();
    }

    async fetchDirectory() {
        try {
            const data = await ApiService.getDoctorsDirectory();
            const meta = data.metadata || {};
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Physicians: ${data.total_physicians}`, 'color: #28a745; font-weight: bold;');
            NotificationService.success('Doctor Directory synchronized.');
        } catch (err) {
            console.error('[DOCTOR-DIRECTORY]: Sync deferred.', err);
            NotificationService.error('Directory sync deferred.');
        }
    }
}
