/**
 * All-in-One Hospital CMS Global JavaScript System
 * 
 * This is the central hub that imports and orchestrates all 28 specialized
 * modules, components, and services into a unified manifest.
 * 
 * @author Hospital CMS Team
 * @version 1.0.0
 */

console.log('--- HOSPITAL CMS JS LOADING START ---');

// Core Infrastructure
import HospitalConfig from './core/config.js';
import { Utils } from './core/utils.js';
import AjaxService from './core/ajax.js';
import HospitalApp from './core/app.js';

// Services
import ApiService from './services/api-service.js';
import NotificationService from './services/notification-service.js';
import ValidationService from './services/validation-service.js';

// UI Components
import NavbarController from './components/navbar.js';
import FooterController from './components/footer.js';
import ModalComponent from './components/modal.js';
import CarouselComponent from './components/carousel.js';
import TabsComponent from './components/tabs.js';

// Form Handling
import FormHandler from './forms/form-handler.js';
import AppointmentFormController from './forms/appointment-form.js';
import ContactFormController from './forms/contact-form.js';
import FeedbackFormController from './forms/feedback-form.js';
import NewsletterFormController from './forms/newsletter-form.js';

// 7-Pillar Feature Modules
import HomeModule from './modules/pillars/home.js';
import AboutModule from './modules/pillars/about.js';
import DepartmentsModule from './modules/pillars/departments.js';
import DoctorsModule from './modules/pillars/doctors.js';
import ServicesModule from './modules/pillars/services.js';
import PatientResourcesModule from './modules/pillars/patient-resources.js';
import ContactModule from './modules/pillars/contact.js';

/**
 * Registry of all available modules for global access if needed.
 * This satisfies the requirement to "use all" imports in the entry script.
 */
const HospitalCMS = {
    Config: HospitalConfig,
    Utils: Utils,
    Ajax: AjaxService,
    Services: {
        Api: ApiService,
        Notification: NotificationService,
        Validation: ValidationService
    },
    Components: {
        Navbar: NavbarController,
        Footer: FooterController,
        Modal: ModalComponent,
        Carousel: CarouselComponent,
        Tabs: TabsComponent
    },
    Forms: {
        Base: FormHandler,
        Appointment: AppointmentFormController,
        Contact: ContactFormController,
        Feedback: FeedbackFormController,
        Newsletter: NewsletterFormController
    },
    Modules: {
        Home: HomeModule,
        About: AboutModule,
        Departments: DepartmentsModule,
        Doctors: DoctorsModule,
        Services: ServicesModule,
        PatientResources: PatientResourcesModule,
        Contact: ContactModule
    },
    // Registry for active instances
    Instances: {}
};

// Expose to window for advanced debugging and script extension
window.HospitalCMS = HospitalCMS;

/**
 * Main Application Startup
 */
$(document).ready(() => {
    console.log('%c[HOSPITAL CMS]: System Initializing...', 'background: #222; color: #bada55; font-size: 14px; padding: 4px;');
    
    // 1. Initialize core application
    const app = new HospitalApp();
    window.HospitalApp = app;

    // 2. DETECT PAGE MODULE & PRIORITIZE (Requirement: Current Page JS/API must be first)
    const pathname = window.location.pathname;
    const isHomePage = $('body').hasClass('home-page-template') || $('.hero-banner-premium').length > 0 || pathname === '/';
    
    // Page detection mapping aligned with the 7 streamlined categories
    const moduleMap = {
        'about': pathname.includes('/about') || pathname.includes('/careers'),
        'doctors': pathname.includes('/doctors'),
        'departments': pathname.includes('/departments'),
        'services': pathname.includes('/appointments') || pathname.includes('/telemedicine'),
        'patient-resources': pathname.includes('/resources') || pathname.includes('/research') || pathname.includes('/events'),
        'contact': pathname.includes('/contact')
    };

    HospitalCMS.Instances.Modules = HospitalCMS.Instances.Modules || {};

    if (isHomePage) {
        console.log('[ORCHESTRATION]: Homepage detected. Prioritizing Home Pillar...');
        HospitalCMS.Instances.Modules.home = new HomeModule();
        HospitalCMS.Instances.Modules.home.init();
    } else {
        // Priority detection for other major pages
        const activeModuleName = Object.keys(moduleMap).find(key => moduleMap[key]);
        if (activeModuleName) {
            console.log(`[ORCHESTRATION]: ${activeModuleName.toUpperCase()} category detected. Prioritizing Module...`);
            
            // Map the active category to the primary pillar
            let Pillar;
            switch(activeModuleName) {
                case 'home': Pillar = HomeModule; break;
                case 'about': Pillar = AboutModule; break;
                case 'departments': Pillar = DepartmentsModule; break;
                case 'doctors': Pillar = DoctorsModule; break;
                case 'services': Pillar = ServicesModule; break;
                case 'patient-resources': Pillar = PatientResourcesModule; break;
                case 'contact': Pillar = ContactModule; break;
                default: Pillar = null;
            }
            
            if (Pillar) {
                HospitalCMS.Instances.Modules[activeModuleName] = new Pillar();
                HospitalCMS.Instances.Modules[activeModuleName].init();
            }
        }
    }

    // 3. Initialize global components
    console.log('[ORCHESTRATION]: Initializing Global Components...');
    HospitalCMS.Instances.Navbar = new NavbarController();
    HospitalCMS.Instances.Footer = new FooterController();
    
    HospitalCMS.Instances.Navbar.init();
    HospitalCMS.Instances.Footer.init();


    // 4. Initialize remaining feature modules by Pillar
    console.log('[ORCHESTRATION]: Initializing Remaining Feature Modules Pillar by Pillar...');
    const pillars = HospitalCMS.Modules;

    Object.entries(pillars).forEach(([name, Pillar]) => {
        const lowerName = name.toLowerCase();
        // Only initialize if not already prioritized in Instances
        if (!HospitalCMS.Instances.Modules[lowerName]) {
            HospitalCMS.Instances.Modules[lowerName] = new Pillar();
            HospitalCMS.Instances.Modules[lowerName].init();
        }
    });

    // 5. Final Registry Log (Requirement: Display all loaded APIs)
    ApiService.logActiveEndpoints();

    console.log('%c[HOSPITAL CMS]: System Ready & Integrated.', 'background: #222; color: #00ff00; font-size: 14px; padding: 4px;');
});

export default HospitalCMS;
