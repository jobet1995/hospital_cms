/**
 * Feedback Module - Manages testimonials and feedback data
 */
import FeedbackFormController from '../forms/feedback-form.js';

class FeedbackController {
    constructor() {
        this.form = new FeedbackFormController();
    }

    init() {
        console.log('Feedback module initialized');
        if ($('.feedback-form').length) this.form.init();
    }
}

export default FeedbackController;
