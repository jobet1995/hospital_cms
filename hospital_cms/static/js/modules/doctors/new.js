import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class NewDoctorsController {
    init() {
        console.log('%c[DOCTOR-NEW]: Induction Manifest active.', 'color: #fd7e14; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const data = await ApiService.getDoctorsNew();
            console.log(`%c[REST SUCCESS] Status: ${data.induction_status} | Recruits: ${data.new_recruits}`, 'color: #28a745; font-weight: bold;');
            NotificationService.success('New Recruits manifest synced.');
        } catch (err) {
            console.error('[DOCTOR-NEW]: Sync deferred.', err);
            NotificationService.error('New Doctors sync deferred.');
        }
    }
}
