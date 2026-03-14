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
        if (!doctorId) return;
        
        const $slotContainer = this.$form.find('.available-slots-container');
        $slotContainer.html('<div class="spinner-border spinner-border-sm text-primary"></div>');

        try {
            console.log(`[BOOKING]: Fetching availability for physician ID: ${doctorId}...`);
            const slots = await ApiService.getDoctorAvailability(doctorId);
            
            // Professional selection rendering
            if (slots && slots.length > 0) {
                let html = '<div class="btn-group gap-2 flex-wrap w-100">';
                slots.forEach(slot => {
                    html += `
                        <input type="radio" class="btn-check" name="time_slot" id="slot-${slot}" value="${slot}" required>
                        <label class="btn btn-outline-primary rounded-pill px-3" for="slot-${slot}">${slot}</label>
                    `;
                });
                html += '</div>';
                $slotContainer.html(html);
            } else {
                $slotContainer.html('<p class="text-muted small">No slots available for today.</p>');
            }
        } catch (err) {
            $slotContainer.html('<p class="text-danger small">Error loading availability.</p>');
        }
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
