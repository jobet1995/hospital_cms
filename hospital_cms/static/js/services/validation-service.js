/**
 * Validation Service for Form Fields
 */
class ValidationService {
    /**
     * Validate email format
     */
    isEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }

    /**
     * Validate phone number
     */
    isPhone(phone) {
        const re = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;
        return re.test(String(phone));
    }

    /**
     * Validate required field
     */
    isRequired(value) {
        if (typeof value === 'string') return value.trim().length > 0;
        return value !== null && value !== undefined;
    }

    /**
     * Validate form data based on rules
     */
    validate(formData, rules) {
        const errors = {};
        
        for (const [field, rule] of Object.entries(rules)) {
            const value = formData[field];
            
            if (rule.required && !this.isRequired(value)) {
                errors[field] = 'This field is required';
            } else if (value && rule.email && !this.isEmail(value)) {
                errors[field] = 'Invalid email address';
            } else if (value && rule.phone && !this.isPhone(value)) {
                errors[field] = 'Invalid phone number';
            }
        }
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }
}

export default new ValidationService();
