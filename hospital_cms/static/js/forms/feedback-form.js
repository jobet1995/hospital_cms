/**
 * Feedback Form Controller
 */
import FormHandler from './form-handler.js';
import HospitalConfig from '../core/config.js';

class FeedbackFormController extends FormHandler {
    constructor() {
        super('.feedback-form', {
            name: { required: true },
            email: { required: true, email: true },
            rating: { required: true },
            comments: { required: true }
        });
    }

    init() {
        super.init();
        this.$form.attr('action', HospitalConfig.ENDPOINTS.FEEDBACK);
        this.bindRatingEvents();
    }

    bindRatingEvents() {
        const $stars = this.$form.find('.star-rating i');
        $stars.on('click', (e) => {
            const rating = $(e.currentTarget).data('rating');
            this.$form.find('[name="rating"]').val(rating);
            $stars.removeClass('fas').addClass('far');
            $stars.each((i, el) => {
                if ($(el).data('rating') <= rating) {
                    $(el).removeClass('far').addClass('fas');
                }
            });
        });
    }
}

export default FeedbackFormController;
