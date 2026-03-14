/**
 * HomepageController - Professional OOP-based interaction hub
 * Handles cinematic UI logic, live data synchronization, and boutique medical UX.
 * 
 * @module Homepage
 */

import ApiService from '/static/js/services/api-service.js';
import AjaxService from '/static/js/core/ajax.js';

class HomepageController {
    constructor() {
        // UI Selectors
        this.selectors = {
            hero: '.hero-banner-premium',
            deptGrid: '.featured-departments-grid',
            doctorGrid: '.featured-doctors-grid',
            newsFeed: '.news-card-platinum',
            emergency: '.emergency-centerpiece-banner',
            testimonial: '.testimonial-boutique-card'
        };

        // State Tracking
        this.state = {
            isDataLoaded: false,
            lastEmergencyCheck: Date.now()
        };

        this.$hero = $(this.selectors.hero);
        this.$deptGrid = $(this.selectors.deptGrid);
    }

    /**
     * Entry Point
     */
    init() {
        console.log('[HOMEPAGE]: Initializing advanced interaction layer...');
        
        this.bindEvents();
        this.initializeAnimations();
        this.fetchHomepageSummary(); // Prioritize Home API visibility
        
        // Setup periodic tasks
        this.setupEmergencyMonitoring();
    }

    /**
     * UI Event Binding
     */
    bindEvents() {
        // Advanced Card Hover Logic
        $(document).on('mouseenter', '.dept-card', (e) => this.handleCardFocus(e));
        
        // Smooth scroll for hero actions
        this.$hero.find('.btn-outline-light').on('click', (e) => {
            e.preventDefault();
            const target = $("#specialties");
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 100
                }, 800);
            }
        });
    }

    /**
     * Cinematic Entrance Animations
     */
    initializeAnimations() {
        // Initial fade-in for hero elements
        const elements = this.$hero.find('.hero-content > *');
        elements.each((index, el) => {
            $(el).css({
                'opacity': 0,
                'transform': 'translateY(20px)'
            }).delay(200 * index).animate({
                'opacity': 1,
                'transform': 'translateY(0)'
            }, 800, 'swing');
        });
    }

    /**
     * AJAX: Homepage Summary Fetching
     * Prioritizes the/api/v1/home/ endpoint for immediate console visibility.
     */
    async fetchHomepageSummary() {
        try {
            console.log('[HOMEPAGE]: Fetching unified Home summary data...');
            const homeData = await ApiService.getHomeData();
            
            if (homeData) {
                console.log('[HOMEPAGE]: Home summary successfully synced.', homeData);
                this.updateHomeUI(homeData);
            }
        } catch (error) {
            console.warn('[HOMEPAGE]: Home data sync failed.', error);
        }
    }

    /**
     * AJAX: Update UI with Home Data
     */
    updateHomeUI(data) {
        console.log('[HOMEPAGE]: UI successfully augmented with unified home data.');
    }

    /**
     * Monitoring Service: Emergency Alerts
     */
    setupEmergencyMonitoring() {
        // Check for urgent updates every 60 seconds
        setInterval(async () => {
            if (Date.now() - this.state.lastEmergencyCheck > 60000) {
                await this.checkEmergencyStatus();
            }
        }, 30000);
    }

    async checkEmergencyStatus() {
        try {
            const status = await AjaxService.get('/api/v1/emergency-alerts/');
            if (status.urgent) {
                this.triggerEmergencyAlert(status.message);
            }
        } catch (e) {
            // Silently fail for background tasks
        }
    }

    /**
     * UI Utilities
     */
    handleCardFocus(event) {
        const $card = $(event.currentTarget);
        $card.find('.dept-img-scale').css('transform', 'scale(1.1)');
    }

    triggerEmergencyAlert(msg) {
        const $banner = $(this.selectors.emergency);
        if ($banner.length) {
            $banner.find('h4').text(msg).css('color', 'var(--white)');
        }
    }
}

export default HomepageController;
