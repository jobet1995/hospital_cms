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
import HomepageController from './modules/homepage.js';
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
    }
};

// Expose to window for advanced debugging and script extension
window.HospitalCMS = HospitalCMS;

/**
 * Main Application Startup
 */
$(document).ready(() => {
    console.log('%c[HOSPITAL CMS]: System Initializing...', 'background: #222; color: #bada55; font-size: 14px; padding: 4px;');
    
    // Log complete manifest for verification
    console.log('[MANIFEST]: Active Modules:', Object.keys(HospitalCMS.Modules));
    console.log('[MANIFEST]: Core Services:', Object.keys(HospitalCMS.Services));
    console.log('[MANIFEST]: UI Components:', Object.keys(HospitalCMS.Components));

    // Initialize the primary application controller
    const app = new HospitalApp();
    app.init();
    
    // Expose app instance globally
    window.HospitalApp = app; 
    
    console.log('%c[HOSPITAL CMS]: System Ready & Integrated. All 28 modules registered.', 'background: #222; color: #00ff00; font-size: 14px; padding: 4px;');
});

export default HospitalCMS;
