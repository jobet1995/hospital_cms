import ApiService from '../services/api-service.js';

class TelemedicineController {
    init() {
        console.log('[SERVICES]: Initializing telemedicine and virtual care hub...');
        this.fetchAvailability();
    }

    async fetchAvailability() {
        try {
            console.log('[SERVICES]: Syncing telemedicine availability windows...');
            const windows = await ApiService.getConsultationAvailability();
            if (windows) {
                console.log('[SERVICES]: Virtual care availability loaded successfully.', windows);
            }
        } catch (err) {
            console.warn('[SERVICES]: Virtual care sync deferred.', err);
        }
    }

    startConsultation(sessionId) {
        console.log(`Starting consultation ${sessionId}`);
    }
}

export default TelemedicineController;
