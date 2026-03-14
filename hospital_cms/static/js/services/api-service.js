/**
 * API Service - Centralized data fetching and submission hub
 * Provides standardized methods for all 28 hospital modules.
 */
import AjaxService from '../core/ajax.js';
import HospitalConfig from '../core/config.js';

class ApiService {
    /**
     * Doctors & Staff
     */
    async getDoctors(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.DOCTORS, params);
    }

    async getDoctorDetails(id) {
        return AjaxService.get(`${HospitalConfig.ENDPOINTS.DOCTORS}${id}/`);
    }

    /**
     * Departments
     */
    async getDepartments(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.DEPARTMENTS, params);
    }

    async getDepartmentDetails(slug) {
        return AjaxService.get(`${HospitalConfig.ENDPOINTS.DEPARTMENTS}${slug}/`);
    }

    /**
     * Telemedicine
     */
    async getConsultationAvailability(doctorId, date) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.TELEMEDICINE, { doctor_id: doctorId, date: date });
    }

    async bookTelemedicine(data) {
        return AjaxService.post('/api/v1/telemedicine/book/', data);
    }

    /**
     * Research & Publications
     */
    async getResearch(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.RESEARCH, params);
    }

    async getPublicationDetails(id) {
        return AjaxService.get(`${HospitalConfig.ENDPOINTS.RESEARCH}${id}/`);
    }

    /**
     * Health Resources
     */
    async getHealthResources(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.RESOURCES, params);
    }

    /**
     * Events & Seminars
     */
    async getEvents(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.EVENTS, params);
    }

    async registerForEvent(eventId, userData) {
        return AjaxService.post(`${HospitalConfig.ENDPOINTS.EVENTS}${eventId}/register/`, userData);
    }

    /**
     * Feedback & Testimonials
     */
    async getTestimonials(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.FEEDBACK, { type: 'testimonial', ...params });
    }

    async submitFeedback(data) {
        return AjaxService.post(HospitalConfig.ENDPOINTS.FEEDBACK, data);
    }

    /**
     * Search (Universal)
     */
    async universalSearch(query) {
        return AjaxService.get('/api/v1/search/', { q: query });
    }

    /**
     * Future/Advanced Utilities (Currently Unused)
     */
    async getEmergencyAlerts() {
        return AjaxService.get('/api/v1/emergency-alerts/');
    }

    async getSiteMetadata() {
        return AjaxService.get('/api/v1/metadata/');
    }

    async getDoctorSchedules(doctorId) {
        return AjaxService.get(`${HospitalConfig.ENDPOINTS.DOCTORS}${doctorId}/schedules/`);
    }
}

export default new ApiService();
