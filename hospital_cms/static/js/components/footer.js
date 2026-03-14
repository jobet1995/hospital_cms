/**
 * Footer Controller - Handles newsletter signup
 */
import FormHandler from '../forms/form-handler.js';
import HospitalConfig from '../core/config.js';

class FooterController {
    constructor() {
        this.newsletterHandler = new FormHandler('.newsletter-form', {
            email: { required: true, email: true }
        });
    }

    init() {
        this.newsletterHandler.init();
        this.newsletterHandler.$form.attr('action', HospitalConfig.ENDPOINTS.NEWSLETTER);
    }
}

export default FooterController;
