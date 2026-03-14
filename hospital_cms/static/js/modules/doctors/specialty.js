import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class SpecialtyController {
    init() {
        console.log('%c[DOCTOR-SPECIALty]: Specialty Cluster synchronization active.', 'color: #6c757d; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const data = await ApiService.getDoctorsBySpecialty();
            console.log(`%c[REST SUCCESS] Protocol: ${data.sync_protocol} | Clusters: ${data.clusters}`, 'color: #28a745; font-weight: bold;');
            NotificationService.success('Specialties manifest synced.');
        } catch (err) {
            console.error('[DOCTOR-SPECIALTY]: Sync deferred.', err);
            NotificationService.error('Specialty sync deferred.');
        }
    }
}
