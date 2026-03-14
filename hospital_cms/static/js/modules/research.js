/**
 * Research Module - Handles publication loading and filtering
 */
import ApiService from '../services/api-service.js';

class ResearchController {
    init() {
        console.log('[RESEARCH]: Initializing clinical archives module...');
        this.bindEvents();
        this.fetchResearchSummary();
    }

    bindEvents() {
        $('.publication-filter').on('change', (e) => {
            this.filterPublications($(e.target).val());
        });
    }

    async fetchResearchSummary() {
        try {
            console.log('[RESEARCH]: Fetching clinical publications and archive status...');
            const research = await ApiService.getResearch();
            if (research) {
                console.log('[RESEARCH]: Archive summary loaded successfully.', research);
            }
        } catch (err) {
            console.warn('[RESEARCH]: Archive sync deferred.', err);
        }
    }

    filterPublications(category) {
        console.log(`Filtering publications by ${category}`);
    }
}

export default ResearchController;
