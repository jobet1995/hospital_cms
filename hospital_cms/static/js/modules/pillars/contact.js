/**
 * Contact Pillar Module
 * Manages Contact forms, locations, and feedback.
 */
import ContactController from '../contact.js';
import FeedbackController from '../feedback.js';

export default class ContactModule {
    constructor() {
        this.contact = new ContactController();
        this.feedback = new FeedbackController();
    }

    init() {
        console.group('[PILLAR]: Contact Module Initializing...');
        this.contact.init();
        this.feedback.init();
        console.groupEnd();
    }
}
