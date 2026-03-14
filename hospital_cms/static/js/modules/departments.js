/**
 * Departments Module - Filtering and listing logic
 */
import ApiService from '../services/api-service.js';

class DepartmentsController {
    init() {
        console.log('[DEPARTMENTS]: Initializing clinical specialties module...');
        this.fetchDepartmentsSummary();
    }

    async fetchDepartmentsSummary() {
        try {
            console.log('[DEPARTMENTS]: Fetching clinical department directory...');
            const depts = await ApiService.getDepartments();
            if (depts) {
                console.log('[DEPARTMENTS]: Department directory loaded successfully.', depts);
            }
        } catch (err) {
            console.warn('[DEPARTMENTS]: Directory sync deferred.', err);
        }
    }

    filterDepartments(category) {
        console.log(`Filtering by ${category}`);
    }
}

export default DepartmentsController;
