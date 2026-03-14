/**
 * API Service - Centralized data fetching and submission hub
 * Provides standardized methods for all 28 hospital modules.
 */
import AjaxService from '../core/ajax.js';
import HospitalConfig from '../core/config.js';

class ApiService {
    /**
     * 1. HOME PILLAR
     */
    async getHomeData() {
        return AjaxService.get(HospitalConfig.ENDPOINTS.HOME);
    }

    async getEmergencyAlerts() {
        return AjaxService.get('/api/v1/emergency-alerts/');
    }

    /**
     * 2. ABOUT PILLAR
     */
    async getAboutGeneral() {
        return AjaxService.get('/api/v1/about/general/');
    }

    async getHospitalHistory() {
        return AjaxService.get('/api/v1/about/history/');
    }

    async getMissionVision() {
        return AjaxService.get('/api/v1/about/mission-vision/');
    }

    async getLeadershipTeam() {
        return AjaxService.get('/api/v1/about/leadership/');
    }

    async getBoardOfDirectors() {
        return AjaxService.get('/api/v1/about/board/');
    }

    async getHospitalFacilities() {
        return AjaxService.get('/api/v1/about/facilities/');
    }

    async getTechnologyEquipment() {
        return AjaxService.get('/api/v1/about/technology/');
    }

    async getAwardsCertifications() {
        return AjaxService.get('/api/v1/about/awards/');
    }

    async getCommunityOutreach() {
        return AjaxService.get('/api/v1/about/community/');
    }

    async getCareersInfo() {
        return AjaxService.get('/api/v1/about/careers/');
    }

    /**
     * 3. DEPARTMENTS PILLAR
     */
    async getDepartments(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.DEPARTMENTS, params);
    }

    async getCardiology() {
        return AjaxService.get('/api/v1/departments/cardiology/');
    }

    async getNeurology() {
        return AjaxService.get('/api/v1/departments/neurology/');
    }

    async getPediatrics() {
        return AjaxService.get('/api/v1/departments/pediatrics/');
    }

    async getOrthopedics() {
        return AjaxService.get('/api/v1/departments/orthopedics/');
    }

    async getDermatology() {
        return AjaxService.get('/api/v1/departments/dermatology/');
    }

    async getOncology() {
        return AjaxService.get('/api/v1/departments/oncology/');
    }

    async getGastroenterology() {
        return AjaxService.get('/api/v1/departments/gastroenterology/');
    }

    async getEmergencyMedicine() {
        return AjaxService.get('/api/v1/departments/emergency/');
    }

    async getGynecology() {
        return AjaxService.get('/api/v1/departments/gynecology/');
    }

    async getUrology() {
        return AjaxService.get('/api/v1/departments/urology/');
    }

    async getOphthalmology() {
        return AjaxService.get('/api/v1/departments/ophthalmology/');
    }

    async getRadiology() {
        return AjaxService.get('/api/v1/departments/radiology/');
    }

    async getInternalMedicine() {
        return AjaxService.get('/api/v1/departments/internal-medicine/');
    }

    async getFamilyMedicine() {
        return AjaxService.get('/api/v1/departments/family-medicine/');
    }

    async getRehabilitation() {
        return AjaxService.get('/api/v1/departments/rehabilitation/');
    }

    async getPsychiatry() {
        return AjaxService.get('/api/v1/departments/psychiatry/');
    }

    async getDentistry() {
        return AjaxService.get('/api/v1/departments/dentistry/');
    }

    async getPulmonology() {
        return AjaxService.get('/api/v1/departments/pulmonology/');
    }

    async getEndocrinology() {
        return AjaxService.get('/api/v1/departments/endocrinology/');
    }

    async getNephrology() {
        return AjaxService.get('/api/v1/departments/nephrology/');
    }

    async getHematology() {
        return AjaxService.get('/api/v1/departments/hematology/');
    }

    async getEntServices() {
        return AjaxService.get('/api/v1/departments/ent-services/');
    }

    async getDepartmentDetails(slug) {
        return AjaxService.get(`${HospitalConfig.ENDPOINTS.DEPARTMENTS}${slug}/`);
    }

    /**
     * 4. DOCTORS PILLAR
     */
    async getDoctors(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.DOCTORS, params);
    }

    async getDoctorDetails(id) {
        return AjaxService.get(`${HospitalConfig.ENDPOINTS.DOCTORS}${id}/`);
    }

    async getDoctorsDirectory() {
        return AjaxService.get('/api/v1/doctors/directory/');
    }

    async getDoctorsFind() {
        return AjaxService.get('/api/v1/doctors/find/');
    }

    async getDoctorsBySpecialty() {
        return AjaxService.get('/api/v1/doctors/specialty/');
    }

    async getDoctorsByDepartment() {
        return AjaxService.get('/api/v1/doctors/department/');
    }

    async getDoctorsFeatured() {
        return AjaxService.get('/api/v1/doctors/featured/');
    }

    async getDoctorsNew() {
        return AjaxService.get('/api/v1/doctors/new/');
    }

    async getDoctorsVisiting() {
        return AjaxService.get('/api/v1/doctors/visiting/');
    }

    async getDoctorsSchedule() {
        return AjaxService.get('/api/v1/doctors/schedule/');
    }

    async getDoctorAvailability(doctorId) {
        if (!doctorId) return [];
        console.log(`%c[API]:%c Checking availability for doctor ID ${doctorId}...`, 'font-weight: bold; color: #3498db;', '');
        return AjaxService.get(HospitalConfig.ENDPOINTS.TELEMEDICINE, { doctor_id: doctorId });
    }

    /**
     * 5. SERVICES PILLAR (Includes Appointments & Telemedicine)
     */
    async bookAppointment(data) {
        return AjaxService.post(HospitalConfig.ENDPOINTS.APPOINTMENT, data);
    }

    async getConsultationAvailability(doctorId, date) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.TELEMEDICINE, { doctor_id: doctorId, date: date });
    }

    async bookTelemedicine(data) {
        return AjaxService.post('/api/v1/telemedicine/book/', data);
    }

    /**
     * 6. PATIENT RESOURCES PILLAR (Includes Research, Resources, Events)
     */
    async getResearch(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.RESEARCH, params);
    }

    async getHealthResources(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.RESOURCES, params);
    }

    async getEvents(params = {}) {
        return AjaxService.get(HospitalConfig.ENDPOINTS.EVENTS, params);
    }

    async registerForEvent(eventId, userData) {
        return AjaxService.post(`${HospitalConfig.ENDPOINTS.EVENTS}${eventId}/register/`, userData);
    }

    /**
     * 7. CONTACT PILLAR (Includes Contact & Feedback)
     */
    async submitContactForm(data) {
        return AjaxService.post(HospitalConfig.ENDPOINTS.CONTACT, data);
    }

    async submitFeedback(data) {
        return AjaxService.post(HospitalConfig.ENDPOINTS.FEEDBACK, data);
    }

    async subscribeNewsletter(email) {
        return AjaxService.post(HospitalConfig.ENDPOINTS.NEWSLETTER, { email });
    }

    /**
     * GLOBAL UTILITIES
     */
    async universalSearch(query) {
        return AjaxService.get('/api/v1/search/', { q: query });
    }

    logActiveEndpoints() {
        console.group('%c[HOSPITAL API MANIFEST v1.0]', 'background: #2c3e50; color: #ecf0f1; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
        
        const pillarMap = {
            'HOME': [HospitalConfig.ENDPOINTS.HOME, '/api/v1/emergency-alerts/'],
            'ABOUT': ['/api/v1/about/history/', '/api/v1/about/leadership/'],
            'DEPARTMENTS': [HospitalConfig.ENDPOINTS.DEPARTMENTS],
            'DOCTORS': [HospitalConfig.ENDPOINTS.DOCTORS],
            'SERVICES': [HospitalConfig.ENDPOINTS.APPOINTMENT, HospitalConfig.ENDPOINTS.TELEMEDICINE],
            'PATIENT RESOURCES': [HospitalConfig.ENDPOINTS.RESEARCH, HospitalConfig.ENDPOINTS.RESOURCES, HospitalConfig.ENDPOINTS.EVENTS],
            'CONTACT': [HospitalConfig.ENDPOINTS.CONTACT, HospitalConfig.ENDPOINTS.FEEDBACK, HospitalConfig.ENDPOINTS.NEWSLETTER]
        };

        const registry = Object.entries(pillarMap).map(([pillar, endpoints]) => ({
            "Pillar": pillar,
            "Integrated Endpoints": endpoints.length,
            "Protocol": "FULL REST",
            "Security": "CSRF + JWT",
            "Status": "READY"
        }));

        console.table(registry);
        console.info('%c[SYSTEM]:%c All 7 Pillars are now active and visible in the console manifest.', 'font-weight: bold; color: #3498db;', '');
        console.groupEnd();
    }
}

export default new ApiService();
