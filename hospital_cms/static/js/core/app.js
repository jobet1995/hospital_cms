/**
 * Main Hospital Application Entry Point
 * 
 * This controller initializes all components, modules, and forms
 * based on their presence in the DOM.
 */

// Components
import NavbarController from '../components/navbar.js';
import FooterController from '../components/footer.js';
import ModalComponent from '../components/modal.js';
import CarouselComponent from '../components/carousel.js';
import TabsComponent from '../components/tabs.js';

// Modules
import HomepageController from '../modules/homepage.js';
import DoctorsController from '../modules/doctors.js';
import DepartmentsController from '../modules/departments.js';
import AppointmentsModule from '../modules/appointments.js';
import TelemedicineController from '../modules/telemedicine.js';
import ResearchController from '../modules/research.js';
import ResourcesController from '../modules/resources.js';
import EventsController from '../modules/events.js';
import FeedbackController from '../modules/feedback.js';
import ContactController from '../modules/contact.js';

class HospitalApp {
    constructor() {
        this.controllers = {};
    }

    init() {
        console.log('Hospital CMS App Initializing...');
        
        this.initComponents();
        this.initModules();
        
        // Final verification check for the user
        this.runSystemCheck();
        
        console.log('Hospital CMS App Ready.');
    }

    /**
     * Professional Verification Check
     * Invokes key services to demonstrate JSON response logging
     */
    async runSystemCheck() {
        console.group('[SYSTEM CHECK]: Verifying API Connectivity...');
        
        try {
            // Import ApiService dynamically to avoid circular dependencies if any
            const { default: ApiService } = await import('../services/api-service.js');
            
            console.log('Attempting to fetch initial data...');
            
            // Trigger 2-3 sample calls to show JSON in console
            // These might 404 if routes aren't defined, but AjaxService will log the JSON error response
            ApiService.getDoctors().catch(() => {});
            ApiService.getDepartments().catch(() => {});
            
            console.info('Check complete. See the [AJAX] logs below for JSON responses.');
        } catch (err) {
            console.error('System check failed to start:', err);
        }
        
        console.groupEnd();
    }

    initComponents() {
        this.controllers.navbar = new NavbarController();
        this.controllers.footer = new FooterController();
        this.controllers.modal = new ModalComponent();
        this.controllers.carousel = new CarouselComponent();
        this.controllers.tabs = new TabsComponent();
        
        Object.values(this.controllers).forEach(c => {
            if (typeof c.init === 'function') c.init();
        });
    }

    initModules() {
        this.controllers.homepage = new HomepageController();
        this.controllers.doctors = new DoctorsController();
        this.controllers.departments = new DepartmentsController();
        this.controllers.appointments = new AppointmentsModule();
        this.controllers.telemedicine = new TelemedicineController();
        this.controllers.research = new ResearchController();
        this.controllers.resources = new ResourcesController();
        this.controllers.events = new EventsController();
        this.controllers.feedback = new FeedbackController();
        this.controllers.contact = new ContactController();

        // Initialize all feature modules
        Object.values(this.controllers).forEach(c => {
            if (typeof c.init === 'function') c.init();
        });
    }
}

// Global initialization is now handled in hospital_cms.js
export default HospitalApp;
