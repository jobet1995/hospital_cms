/**
 * Tabs Component - Tabbed interface handler
 */
class TabsComponent {
    constructor() {
        this.$tabs = $('.tabs-nav');
    }

    init() {
        if (this.$tabs.length === 0) return;
        this.bindEvents();
    }

    bindEvents() {
        this.$tabs.on('click', '.tab-item', (e) => {
            e.preventDefault();
            const $el = $(e.currentTarget);
            const target = $el.data('tab-target');
            this.switchTab($el, target);
        });
    }

    switchTab($tabLink, targetId) {
        const $container = $tabLink.closest('.tabs-container');
        
        $container.find('.tab-item').removeClass('is-active');
        $tabLink.addClass('is-active');
        
        $container.find('.tab-content').removeClass('is-active');
        $(`#${targetId}`).addClass('is-active');
    }
}

export default TabsComponent;
