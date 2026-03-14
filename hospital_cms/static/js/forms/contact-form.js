/**
 * Contact Form Controller
 */
import FormHandler from './form-handler.js';
import HospitalConfig from '../core/config.js';

class ContactFormController extends FormHandler {
    constructor() {
        super('.contact-form', {
            name: { required: true },
            email: { required: true, email: true },
            subject: { required: true },
            message: { required: true }
        });
    }

    init() {
        super.init();
        this.$form.attr('action', HospitalConfig.ENDPOINTS.CONTACT);
    }
}

export default ContactFormController;
