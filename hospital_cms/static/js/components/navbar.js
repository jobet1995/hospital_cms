/**
 * Navbar Controller - Handles mobile menu, dropdowns, and sticky header
 */
class NavbarController {
    constructor() {
        this.$wrapper = $('.header-wrapper');
        this.$navbar = $('.main-nav');
        this.$toggler = $('.custom-toggler');
        this.$searchTrigger = $('#searchTrigger');
    }

    init() {
        if (this.$wrapper.length === 0) return;
        this.bindEvents();
        this.handleSticky();
        console.log('[NAVBAR]: Controller Initialized');
    }

    bindEvents() {
        // Sticky scroll event with throttle
        $(window).on('scroll', () => {
            requestAnimationFrame(() => this.handleSticky());
        });

        // Search Trigger (Placeholder for expansion logic)
        this.$searchTrigger.on('click', () => {
            console.log('[NAVBAR]: Search overlay would expand here');
            // Logic for a sleek search overlay could go here
        });
    }

    handleSticky() {
        const scrollTop = $(window).scrollTop();
        if (scrollTop > 80) {
            this.$wrapper.addClass('header-scrolled');
        } else {
            this.$wrapper.removeClass('header-scrolled');
        }
    }
}

export default NavbarController;
