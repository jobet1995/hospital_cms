/**
 * Contact Module
 */
import ContactFormController from '../forms/contact-form.js';

class ContactController {
    constructor() {
        this.form = new ContactFormController();
    }

    init() {
        console.log('Contact module initialized');
        if ($('.contact-form').length) this.form.init();
    }
}

export default ContactController;
