import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class FindDoctorController {
    init() {
        console.log('%c[DOCTOR-FIND]: Discovery Engine primed.', 'color: #17a2b8; font-weight: bold; font-size: 1.1em;');
        this.fetchFindMetadata();
    }

    async fetchFindMetadata() {
        try {
            const data = await ApiService.getDoctorsFind();
            console.log(`%c[REST SUCCESS] Search Engine: ${data.search_engine} | Status: ACTIVE`, 'color: #28a745; font-weight: bold;');
            NotificationService.success('Discovery Engine ready.');
        } catch (err) {
            console.error('[DOCTOR-FIND]: Search sync deferred.', err);
            NotificationService.error('Find Doctor sync deferred.');
        }
    }
}
