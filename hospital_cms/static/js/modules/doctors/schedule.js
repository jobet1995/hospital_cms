import ApiService from '../../services/api-service.js';
import NotificationService from '../../services/notification-service.js';

export default class DoctorScheduleController {
    init() {
        console.log('%c[DOCTOR-SCHEDULE]: Dynamic Clinical Alignment engine active.', 'color: #dc3545; font-weight: bold; font-size: 1.1em;');
        this.sync();
    }

    async sync() {
        try {
            const data = await ApiService.getDoctorsSchedule();
            console.log(`%c[REST SUCCESS] Engine: ${data.scheduler_engine} | Real-time: ${data.realtime_availability}`, 'color: #28a745; font-weight: bold;');
            NotificationService.success('Physician Scheduling synced.');
        } catch (err) {
            console.error('[DOCTOR-SCHEDULE]: Sync deferred.', err);
            NotificationService.error('Scheduling manifest deferred.');
        }
    }
}
