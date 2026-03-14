/**
 * Navbar Controller - Premium Boutique Medical Edition
 * Handles high-end scroll reactions, glassmorphism state shifts, and micro-interactions.
 */
class NavbarController {
    constructor() {
        this.$wrapper = $('.header-wrapper');
        this.$navbar = $('.main-nav');
        this.$collapse = $('#navbarNav');
        this.$searchTrigger = $('#searchTrigger');
        this.lastScroll = 0;
        this.ticking = false;
    }

    init() {
        if (this.$wrapper.length === 0) return;
        
        this.bindEvents();
        this.handleSticky();
        
        console.log('%c[NAVBAR]: Premium Controller Active', 'color: #3b82f6; font-weight: bold;');
    }

    bindEvents() {
        // High-performance scroll listener
        $(window).on('scroll', () => {
            this.handleScrollUpdate();
        });

        // Search Trigger Logic
        this.$searchTrigger.on('click', (e) => {
            e.preventDefault();
            this.toggleSearch();
        });

        // Professional Mobile Toggler & Overlay Logic
        $('.navbar-toggler').on('click', () => {
            console.log('[NAVBAR]: Toggler clicked. Manual state shift...');
            this.$collapse.collapse('toggle');
        });

        // About Pillar Engagement Trigger
        $('#nav-about').on('click', (e) => {
            console.log('[NAVBAR]: About Engagement Detected. Syncing Corporate Intelligence...');
            if (window.HospitalCMS && window.HospitalCMS.Instances.Modules.about) {
                window.HospitalCMS.Instances.Modules.about.fetchAboutData();
            }
        });

        // Departments Pillar Engagement Trigger
        $('#nav-depts').on('click', (e) => {
            console.log('[NAVBAR]: Departments Engagement Detected. Syncing Clinical Intelligence...');
            if (window.HospitalCMS && window.HospitalCMS.Instances.Modules.departments) {
                window.HospitalCMS.Instances.Modules.departments.fetchDepartmentsData();
            }
        });

        this.$collapse.on('show.bs.collapse', () => {
            $('body').addClass('mobile-menu-active');
            this.$wrapper.addClass('drawer-open');
        });

        this.$collapse.on('hide.bs.collapse', () => {
            $('body').removeClass('mobile-menu-active');
            this.$wrapper.removeClass('drawer-open');
        });

        // Close menu on link click (important for SPAs or single-page feel)
        this.$collapse.find('.nav-link').on('click', () => {
            if (window.innerWidth < 992) {
                this.$collapse.collapse('hide');
            }
        });
    }

    handleScrollUpdate() {
        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.handleSticky();
                this.ticking = false;
            });
            this.ticking = true;
        }
    }

    handleSticky() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        // Scrolled state - Trigger earlier for better feedback
        if (currentScroll > 10) {
            if (!this.$wrapper.hasClass('header-scrolled')) {
                this.$wrapper.addClass('header-scrolled');
            }
        } else {
            if (this.$wrapper.hasClass('header-scrolled')) {
                this.$wrapper.removeClass('header-scrolled');
            }
        }

        this.lastScroll = currentScroll;
    }

    toggleSearch() {
        // Placeholder for advanced search overlay logic
        // In a full implementation, this might trigger a dedicated SearchService
        console.log('[NAVBAR]: Search Overlay Expanding...');
        $('body').addClass('search-overlay-active');
    }
}

export default NavbarController;
