import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class FacilitiesController {
    init() {
        console.log('%c[ABOUT-FACILITIES]: Campus and infrastructure data sync...', 'color: #0d6efd; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const response = await ApiService.getHospitalFacilities();
            const meta = response.metadata || {};
            
            console.log(`%c[REST SUCCESS] Sync ID: ${meta.clinical_sync_id} | Benchmark: ${meta.server_benchmark}`, 'color: #198754; font-weight: bold;');
            NotificationService.success('Facility infrastructure records synced.');
        } catch (err) {
            console.error('[ABOUT-FACILITIES]: Sync deferred.', err);
            NotificationService.error('Facilities sync deferred.');
        }
    }
}
