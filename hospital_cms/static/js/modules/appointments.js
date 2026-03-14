/**
 * Appointments Module - High-level flow for hospital booking
 */
import AppointmentFormController from '../forms/appointment-form.js';

class AppointmentsModule {
    constructor() {
        this.form = new AppointmentFormController();
    }

    init() {
        console.log('Appointments module initialized');
        if ($('.appointment-form').length) this.form.init();
    }
}

export default AppointmentsModule;
