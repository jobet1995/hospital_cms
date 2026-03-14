/**
 * Newsletter Form Controller
 */
import FormHandler from './form-handler.js';
import HospitalConfig from '../core/config.js';

class NewsletterFormController extends FormHandler {
    constructor() {
        super('.newsletter-form', {
            email: { required: true, email: true }
        });
    }

    init() {
        super.init();
        this.$form.attr('action', HospitalConfig.ENDPOINTS.NEWSLETTER);
    }
}

export default NewsletterFormController;
