/**
 * Base Form Handler Module
 */
import AjaxService from '../core/ajax.js';
import NotificationService from '../services/notification-service.js';
import ValidationService from '../services/validation-service.js';

class FormHandler {
    constructor(formSelector, rules = {}) {
        this.$form = $(formSelector);
        this.rules = rules;
        this.$submitBtn = this.$form.find('[type="submit"]');
    }

    init() {
        if (this.$form.length === 0) return;
        this.bindEvents();
    }

    bindEvents() {
        this.$form.on('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });

        // Real-time validation on input change
        this.$form.find('input, textarea, select').on('change blur', (e) => {
            this.validateField($(e.target));
        });
    }

    async handleSubmit() {
        const formData = this.getFormData();
        const validation = ValidationService.validate(formData, this.rules);

        if (!validation.isValid) {
            this.showErrors(validation.errors);
            return;
        }

        this.setLoading(true);
        this.clearAllErrors();

        try {
            const url = this.$form.attr('action') || window.location.href;
            const response = await AjaxService.post(url, formData);
            
            // Professional Success handling
            NotificationService.success(response.message || 'Operation completed successfully.');
            this.onSuccess(response);
            
        } catch (error) {
            // Handle Django Form Errors (typically { "errors": { "field": ["msg"] } })
            if (error.responseJSON && error.responseJSON.errors) {
                this.mapServerErrors(error.responseJSON.errors);
            } else {
                NotificationService.error(error.message);
            }
            this.onError(error);
        } finally {
            this.setLoading(false);
        }
    }

    /**
     * Maps Django style form errors to the UI
     */
    mapServerErrors(errors) {
        Object.entries(errors).forEach(([field, messages]) => {
            const msg = Array.isArray(messages) ? messages[0] : messages;
            const $field = this.$form.find(`[name="${field}"]`);
            this.toggleFieldError($field, msg);
        });
        NotificationService.error('Please check the highlighted fields.');
    }

    clearAllErrors() {
        this.$form.find('.is-invalid').removeClass('is-invalid');
        this.$form.find('.error-message').remove();
    }

    getFormData() {
        const data = {};
        this.$form.serializeArray().forEach(item => {
            data[item.name] = item.value;
        });
        return data;
    }

    validateField($field) {
        const name = $field.attr('name');
        const value = $field.val();
        if (this.rules[name]) {
            const fieldRule = { [name]: this.rules[name] };
            const validation = ValidationService.validate({ [name]: value }, fieldRule);
            this.toggleFieldError($field, validation.errors[name]);
        }
    }

    toggleFieldError($field, errorMsg) {
        const $group = $field.closest('.form-group');
        $group.find('.error-message').remove();
        
        if (errorMsg) {
            $field.addClass('is-invalid');
            $group.append(`<span class="error-message text-danger small">${errorMsg}</span>`);
        } else {
            $field.removeClass('is-invalid');
        }
    }

    showErrors(errors) {
        Object.keys(errors).forEach(name => {
            const $field = this.$form.find(`[name="${name}"]`);
            this.toggleFieldError($field, errors[name]);
        });
        NotificationService.error('Please correct the errors in the form.');
    }

    setLoading(isLoading) {
        if (isLoading) {
            this.$submitBtn.prop('disabled', true).addClass('btn-loading');
        } else {
            this.$submitBtn.prop('disabled', false).removeClass('btn-loading');
        }
    }

    onSuccess(response) {
        if (response.redirect_url) {
            window.location.href = response.redirect_url;
        } else {
            this.$form[0].reset();
        }
    }

    onError(error) {
        // Optional hook for subclasses
        console.error('Form Submission Error:', error);
    }
}

export default FormHandler;
