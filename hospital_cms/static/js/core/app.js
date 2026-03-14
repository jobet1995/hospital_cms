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
import HomepageController from '../homepage.js';
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
        this.version = '1.0.0';
    }

    init() {
        console.log('Hospital CMS Core Infrastructure Ready.');
        this.runSystemCheck();
    }
    
    // ... runSystemCheck implementation remains the same ...

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
        
        // Register back to global manifest for transparency
        if (window.HospitalCMS) {
            window.HospitalCMS.Instances.Components = this.controllers;
        }

        Object.values(this.controllers).forEach(c => {
            if (typeof c.init === 'function') c.init();
        });
    }

    initModules() {
        // Feature modules
        const modules = {
            homepage: new HomepageController(),
            doctors: new DoctorsController(),
            departments: new DepartmentsController(),
            appointments: new AppointmentsModule(),
            telemedicine: new TelemedicineController(),
            research: new ResearchController(),
            resources: new ResourcesController(),
            events: new EventsController(),
            feedback: new FeedbackController(),
            contact: new ContactController()
        };

        // Register back to global manifest
        if (window.HospitalCMS) {
            window.HospitalCMS.Instances.Modules = modules;
        }

        Object.values(modules).forEach(c => {
            if (typeof c.init === 'function') c.init();
        });
    }
}

// Global initialization logic removed from here as it's in hospital_cms.js
export default HospitalApp;
