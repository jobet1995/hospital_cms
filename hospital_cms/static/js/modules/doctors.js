/**
 * Doctors Module - Profile and schedule interactions
 */
import ApiService from '../services/api-service.js';

class DoctorsController {
    init() {
        console.log('[DOCTORS]: Initializing clinical staff module...');
        this.bindEvents();
        this.fetchDoctorsSummary();
    }

    bindEvents() {
        $('.doctor-card').on('click', '.view-schedule', (e) => {
            const doctorId = $(e.currentTarget).data('doctor-id');
            this.showSchedule(doctorId);
        });
    }

    async fetchDoctorsSummary() {
        try {
            console.log('[DOCTORS]: Fetching dynamic clinical staff data...');
            const doctors = await ApiService.getDoctors();
            if (doctors) {
                console.log('[DOCTORS]: Staff summary loaded successfully.', doctors);
            }
        } catch (err) {
            console.warn('[DOCTORS]: Staff sync deferred.', err);
        }
    }

    showSchedule(doctorId) {
        console.log(`Showing schedule for doctor ${doctorId}`);
    }
}

export default DoctorsController;
