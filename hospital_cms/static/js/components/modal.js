/**
 * Modal Component - Generic modal handler
 */
class ModalComponent {
    constructor() {
        this.$modals = $('.modal');
        this.$triggers = $('[data-modal-target]');
    }

    init() {
        if (this.$triggers.length === 0) return;
        this.bindEvents();
    }

    bindEvents() {
        this.$triggers.on('click', (e) => {
            e.preventDefault();
            const target = $(e.currentTarget).data('modal-target');
            this.open(target);
        });

        $(document).on('click', '[data-modal-close]', (e) => {
            e.preventDefault();
            this.close($(e.currentTarget).closest('.modal'));
        });

        // Close on overlay click
        $(document).on('click', '.modal-overlay', (e) => {
            this.close($(e.currentTarget).parent());
        });
    }

    open(modalId) {
        const $modal = $(`#${modalId}`);
        $modal.addClass('is-active');
        $('body').addClass('modal-open');
    }

    close($modal) {
        $modal.removeClass('is-active');
        $('body').removeClass('modal-open');
    }
}

export default ModalComponent;
