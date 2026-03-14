/**
 * Appointment Form Controller - Specialized booking logic
 */
import FormHandler from '../forms/form-handler.js';
import HospitalConfig from '../core/config.js';

class AppointmentFormController extends FormHandler {
    constructor() {
        super('.appointment-form', {
            name: { required: true },
            email: { required: true, email: true },
            phone: { required: true, phone: true },
            doctor: { required: true },
            date: { required: true }
        });
    }

    init() {
        super.init();
        this.$form.attr('action', HospitalConfig.ENDPOINTS.APPOINTMENT);
        this.bindCustomEvents();
    }

    bindCustomEvents() {
        // Example: Dynamic time slots based on doctor selection
        this.$form.find('[name="doctor"]').on('change', (e) => {
            const doctorId = $(e.target).val();
            this.loadAvailableSlots(doctorId);
        });
    }

    async loadAvailableSlots(doctorId) {
        console.log(`Loading slots for doctor ${doctorId}`);
        // AJAX logic to fetch slots would go here
    }

    onSuccess(response) {
        super.onSuccess(response);
        // Professional approach: Notify system that an appointment was made
        import('../core/utils.js').then(({ Utils }) => {
            Utils.events.publish('appointment:booked', response.data);
        });
    }
}

export default AppointmentFormController;
