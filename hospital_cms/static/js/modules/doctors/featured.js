import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class FeaturedDoctorsController {
    init() {
        console.log('%c[DOCTOR-FEATURED]: Excellence Manifest spotlight active.', 'color: #ffc107; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const data = await ApiService.getDoctorsFeatured();
            console.log(`%c[REST SUCCESS] Type: ${data.highlight_type} | Count: ${data.featured_count}`, 'color: #28a745; font-weight: bold;');
            NotificationService.success('Featured Physicians spotlight synced.');
        } catch (err) {
            console.error('[DOCTOR-FEATURED]: Sync deferred.', err);
            NotificationService.error('Featured Doctors sync deferred.');
        }
    }
}
