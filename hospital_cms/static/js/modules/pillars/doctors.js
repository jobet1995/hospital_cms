/**
 * Doctors Pillar Module
 * Manages physician directory and profiles.
 */
import DoctorsController from '../doctors.js';

export default class DoctorsModule {
    constructor() {
        this.controller = new DoctorsController();
    }

    init() {
        console.log('[PILLAR]: Doctors Module Initializing...');
        this.controller.init();
    }
}
