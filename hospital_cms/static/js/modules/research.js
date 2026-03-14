/**
 * Research Module - Handles publication loading and filtering
 */
class ResearchController {
    init() {
        console.log('Research module initialized');
        this.bindEvents();
    }

    bindEvents() {
        $('.publication-filter').on('change', (e) => {
            this.filterPublications($(e.target).val());
        });
    }

    filterPublications(category) {
        console.log(`Filtering publications by ${category}`);
    }
}

export default ResearchController;
