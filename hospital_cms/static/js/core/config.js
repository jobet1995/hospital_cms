/**
 * Global Configuration and Constants
 */
const HospitalConfig = {
    DEBUG: true,
    API_BASE_URL: '/api/v1',
    ENDPOINTS: {
        NEWSLETTER: '/api/v1/newsletter/subscribe/',
        APPOINTMENT: '/api/v1/appointments/book/',
        CONTACT: '/api/v1/contact/submit/',
        DEPARTMENTS: '/api/v1/departments/',
        DOCTORS: '/api/v1/doctors/',
        TELEMEDICINE: '/api/v1/telemedicine/availability/',
        RESEARCH: '/api/v1/research/publications/',
        RESOURCES: '/api/v1/health-resources/',
        EVENTS: '/api/v1/events/',
        FEEDBACK: '/api/v1/feedback/'
    },
    ANIMATION_SPEED: 300,
    TOAST_DURATION: 5000
};

export default HospitalConfig;
