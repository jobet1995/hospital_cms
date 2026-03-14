/**
 * Department Page Interaction Controller
 * Handles page-level clinical visualizations and animations.
 */
import NotificationService from '../../services/notification-service.js';

class DepartmentPageController {
    constructor() {
        this.revealElements = document.querySelectorAll('.reveal-on-scroll');
    }

    init() {
        console.log('%c[DEPARTMENT-PAGE]: Premium Clinical Interface operational.', 'color: #3498db; font-weight: bold; font-size: 1.1em;');
        this.setupScrollAnimations();
        this.setupInteractiveElements();
        this.logClinicalManifest();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        this.revealElements.forEach(el => observer.observe(el));
    }

    setupInteractiveElements() {
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Team directory feedback
        const teamItems = document.querySelectorAll('.doctor-minimal-card');
        teamItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                console.debug('[HOSPITAL]: Clinical spotlight on specialist.');
            });
        });
    }

    logClinicalManifest() {
        const unitCode = document.querySelector('.badge')?.innerText || 'N/A';
        console.group('%c[CLINICAL UNIT MANIFEST]', 'background: #3498db; color: white; padding: 2px 5px; border-radius: 3px;');
        console.info(`Unit ID: ${unitCode}`);
        console.info(`Status: OPERATIONAL`);
        console.info(`Sync: REAL-TIME`);
        console.groupEnd();
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    const controller = new DepartmentPageController();
    controller.init();
});
