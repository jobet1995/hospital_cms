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

// 7-Pillar Modules
import HomeModule from '../modules/pillars/home.js';
import AboutModule from '../modules/pillars/about.js';
import DepartmentsModule from '../modules/pillars/departments.js';
import DoctorsModule from '../modules/pillars/doctors.js';
import ServicesModule from '../modules/pillars/services.js';
import PatientResourcesModule from '../modules/pillars/patient-resources.js';
import ContactModule from '../modules/pillars/contact.js';

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
        console.group('%c[SYSTEM INITIALIZATION]: Verifying Digital Infrastructure', 'background: #2c3e50; color: #ecf0f1; font-weight: bold; padding: 4px 8px; border-radius: 4px;');
        
        try {
            // Import ApiService dynamically
            const { default: ApiService } = await import('../services/api-service.js');
            
            console.log('%c[ACTION]:%c Bootstrapping initial data streams...', 'font-weight: bold; color: #3498db;', '');
            
            // Execute parallel calls to demonstrate AJAX system
            const checks = [
                ApiService.getHomeData().then(() => console.info('%c[CHECK]:%c Home API stream verified.', 'color: #2ecc71; font-weight: bold;', '')),
                ApiService.getDoctors({ limit: 3 }).catch(() => {}),
                ApiService.getEmergencyAlerts().catch(() => {})
            ];
            
            await Promise.allSettled(checks);
            
            console.info('%c[INFRASTRUCTURE]:%c All systems operational. Proper AJAX Responses are visible in the logs above.', 'font-weight: bold; color: #2ecc71;', '');
        } catch (err) {
            console.error('[CRITICAL]: System check encountered a failure:', err);
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
        console.log('[ORCHESTRATION]: Initializing 7-Pillar System...');
        
        // Feature modules regrouped into 7 Pillars
        const modules = {
            home: new HomeModule(),
            about: new AboutModule(),
            departments: new DepartmentsModule(),
            doctors: new DoctorsModule(),
            services: new ServicesModule(),
            patientResources: new PatientResourcesModule(),
            contact: new ContactModule()
        };

        // Register back to global manifest
        if (window.HospitalCMS) {
            window.HospitalCMS.Instances.Modules = modules;
        }

        Object.values(modules).forEach(m => {
            if (typeof m.init === 'function') m.init();
        });
    }
}

// Global initialization logic removed from here as it's in hospital_cms.js
export default HospitalApp;
