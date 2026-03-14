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

// Specialized Feature Modules
import HomepageController from './homepage.js';
import DoctorsController from './modules/doctors.js';
import DepartmentsController from './modules/departments.js';
import AppointmentsModule from './modules/appointments.js';
import TelemedicineController from './modules/telemedicine.js';
import ResearchController from './modules/research.js';
import ResourcesController from './modules/resources.js';
import EventsController from './modules/events.js';
import FeedbackController from './modules/feedback.js';
import ContactController from './modules/contact.js';

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
        Homepage: HomepageController,
        Doctors: DoctorsController,
        Departments: DepartmentsController,
        Appointments: AppointmentsModule,
        Telemedicine: TelemedicineController,
        Research: ResearchController,
        Resources: ResourcesController,
        Events: EventsController,
        Feedback: FeedbackController,
        Contact: ContactController
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
    
    // Page detection mapping
    const moduleMap = {
        'doctors': pathname.includes('/doctors'),
        'departments': pathname.includes('/departments'),
        'research': pathname.includes('/research') || pathname.includes('/publications')
    };

    HospitalCMS.Instances.Modules = HospitalCMS.Instances.Modules || {};

    if (isHomePage) {
        console.log('[ORCHESTRATION]: Homepage detected. Prioritizing Home Module...');
        HospitalCMS.Instances.Modules.homepage = new HomepageController();
        HospitalCMS.Instances.Modules.homepage.init();
    } else {
        // Priority detection for other major pages
        const activeModuleName = Object.keys(moduleMap).find(key => moduleMap[key]);
        if (activeModuleName) {
            console.log(`[ORCHESTRATION]: ${activeModuleName.toUpperCase()} page detected. Prioritizing Module...`);
            const Controller = activeModuleName === 'doctors' ? DoctorsController : 
                               activeModuleName === 'departments' ? DepartmentsController : ResearchController;
            
            HospitalCMS.Instances.Modules[activeModuleName] = new Controller();
            HospitalCMS.Instances.Modules[activeModuleName].init();
        }
    }

    // 3. Initialize global components
    console.log('[ORCHESTRATION]: Initializing Global Components...');
    HospitalCMS.Instances.Navbar = new NavbarController();
    HospitalCMS.Instances.Footer = new FooterController();
    
    HospitalCMS.Instances.Navbar.init();
    HospitalCMS.Instances.Footer.init();

    // 4. Initialize remaining feature modules
    console.log('[ORCHESTRATION]: Initializing Remaining Feature Modules...');
    const allModules = {
        homepage: HomepageController,
        doctors: DoctorsController,
        departments: DepartmentsController,
        appointments: AppointmentsModule,
        telemedicine: TelemedicineController,
        research: ResearchController,
        resources: ResourcesController,
        events: EventsController,
        feedback: FeedbackController,
        contact: ContactController
    };

    Object.entries(allModules).forEach(([name, Controller]) => {
        // Only initialize if not already prioritized
        if (!HospitalCMS.Instances.Modules[name]) {
            HospitalCMS.Instances.Modules[name] = new Controller();
            HospitalCMS.Instances.Modules[name].init();
        }
    });

    // 5. Final Registry Log (Requirement: Display all loaded APIs)
    ApiService.logActiveEndpoints();

    console.log('%c[HOSPITAL CMS]: System Ready & Integrated.', 'background: #222; color: #00ff00; font-size: 14px; padding: 4px;');
});

export default HospitalCMS;
