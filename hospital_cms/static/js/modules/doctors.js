/**
 * Doctors Module - Profile and schedule interactions
 */
class DoctorsController {
    init() {
        console.log('Doctors module initialized');
        this.bindEvents();
    }

    bindEvents() {
        $('.doctor-card').on('click', '.view-schedule', (e) => {
            const doctorId = $(e.currentTarget).data('doctor-id');
            this.showSchedule(doctorId);
        });
    }

    showSchedule(doctorId) {
        console.log(`Showing schedule for doctor ${doctorId}`);
    }
}

export default DoctorsController;
