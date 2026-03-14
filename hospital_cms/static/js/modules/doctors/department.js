import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class DepartmentDoctorController {
    init() {
        console.log('%c[DOCTOR-DEPT]: Departmental Unit mapping active.', 'color: #28a745; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const data = await ApiService.getDoctorsByDepartment();
            console.log(`%c[REST SUCCESS] Units: ${data.units} | Sync Status: ${data.operational_sync}`, 'color: #28a745; font-weight: bold;');
            NotificationService.success('Departmental physicians synced.');
        } catch (err) {
            console.error('[DOCTOR-DEPT]: Sync deferred.', err);
            NotificationService.error('Department sync deferred.');
        }
    }
}
