/**
 * Services Pillar Module
 * Orchestrates Appointments and Telemedicine services.
 */
import AppointmentsModule from '../appointments.js';
import TelemedicineController from '../telemedicine.js';

export default class ServicesModule {
    constructor() {
        this.appointments = new AppointmentsModule();
        this.telemedicine = new TelemedicineController();
    }

    init() {
        console.group('[PILLAR]: Services Module Initializing...');
        this.appointments.init();
        this.telemedicine.init();
        console.groupEnd();
    }
}
