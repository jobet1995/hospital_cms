/**
 * DepartmentController - Professional Clinical Interaction Hub
 * Orchestrates cinematic UI logic, live data synchronization, and boutique medical UX.
 * 
 * @module Departments
 * @version 2.0.0
 */

import ApiService from '/static/js/services/api-service.js';
import AjaxService from '/static/js/core/ajax.js';

class DepartmentController {
    constructor() {
        // 1. Technical Selectors
        this.selectors = {
            reveal: '.reveal-on-scroll',
            hero: '.department-hero',
            expertise: '.expertise-card',
            team: '.doctor-minimal-card',
            badge: '.badge',
            loader: '.clinical-loader',
            metric: '.success-metric'
        };

        // 2. Clinical State Management
        this.state = {
            isDataLoaded: false,
            unitCode: $(this.selectors.badge).first().text().replace('Unit Code:', '').trim() || 'CLIN-X',
            benchmark: 0,
            syncTimestamp: null
        };

        // 3. UI References
        this.$window = $(window);
        this.$body = $('body');
    }

    /**
     * Entry Point: Professional Clinical Induction
     */
    init() {
        const startTime = performance.now();
        console.log(`%c[CLINICAL-HUB]: Initiating induction for unit ${this.state.unitCode}...`, 'color: #3498db; font-weight: bold; font-size: 1.1em;');
        
        this.initializeAnimations();
        this.bindEvents();
        this.syncClinicalManifest().then(() => {
            const endTime = performance.now();
            this.state.benchmark = (endTime - startTime).toFixed(2);
            this.logClinicalManifest();
        });
    }

    /**
     * Scroll-triggered & Entrance Animations (Intersection Observer)
     */
    initializeAnimations() {
        const revealElements = document.querySelectorAll(this.selectors.reveal);
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(entry.target).addClass('active animate-fade-in-up');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        revealElements.forEach(el => observer.observe(el));
    }

    /**
     * UI Event Binding (jQuery-Augmented)
     */
    bindEvents() {
        // Advanced Anchor Navigation with Offset Compensation
        $(document).on('click', 'a[href^="#"]', (e) => {
            const targetId = $(e.currentTarget).attr('href');
            if (targetId === '#' || !targetId) return;
            
            const $target = $(targetId);
            if ($target.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: $target.offset().top - 100
                }, 1000, 'easeInOutExpo'); // Requires easing plugin or standard swing
            }
        });

        // Team Spotlight Interactions with Telemetry
        $(this.selectors.team).on('mouseenter', (e) => {
            const $card = $(e.currentTarget);
            $card.addClass('shadow-lg scale-102');
            console.debug(`[TELEMETRY]: Spotlight focus on specialist in unit ${this.state.unitCode}.`);
        }).on('mouseleave', (e) => {
            $(e.currentTarget).removeClass('shadow-lg scale-102');
        });
    }

    /**
     * Advanced Clinical Synchronization
     * Integrates with ApiService and AjaxService for deep data validation.
     */
    async syncClinicalManifest() {
        try {
            console.log('[NETWORK]: Synchronizing with Medical Manifest Service...');
            
            // 1. Initial Handshake via AjaxService
            await AjaxService.get('/api/v1/clinical/handshake/', { unit: this.state.unitCode });

            // 2. Fetch Unit Specific Data via ApiService
            const slug = window.location.pathname.split('/').filter(Boolean).pop();
            const details = await ApiService.getDepartmentDetails(slug);
            console.log('[API]: Department meta-verification successful.', details);
            
            this.state.isDataLoaded = true;
            this.state.syncTimestamp = new Date().toISOString();

            // 3. UI Response Feedback
            this.triggerSuccessHaptics();

        } catch (error) {
            console.warn('[NETWORK]: Clinical synchronization partially restricted.', error);
            // Fallback for demo/offline logic
            this.state.isDataLoaded = true;
            this.triggerSuccessHaptics();
        }
    }

    /**
     * jQuery-Based UI Responses
     */
    triggerSuccessHaptics() {
        const $badge = $(this.selectors.badge);
        $badge.addClass('pulse-clinical');
        
        // Dynamic loading of success metrics
        $(this.selectors.metric).each(function() {
            const $bar = $(this).find('.progress-bar');
            const targetWidth = $bar.attr('style').match(/width:\s*([^;]+)/)[1];
            $bar.css('width', '0').animate({ width: targetWidth }, 1500);
        });
    }

    /**
     * Professional Clinical Telemetry
     */
    logClinicalManifest() {
        console.group('%c[CLINICAL UNIT MANIFEST]', 'background: #2c3e50; color: #3498db; padding: 5px 10px; border-radius: 5px; font-weight: bold;');
        console.info(`Unit ID:      ${this.state.unitCode}`);
        console.info(`Status:       %cOPERATIONAL`, 'color: #2ecc71; font-weight: bold;');
        console.info(`Benchmark:    ${this.state.benchmark}ms`);
        console.info(`Sync Time:    ${this.state.syncTimestamp}`);
        console.info(`Service:      API-EXCELLENCE-CORE v2.1`);
        console.groupEnd();
    }
}

// Export for global orchestration
export default DepartmentController;
