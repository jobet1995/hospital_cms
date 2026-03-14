/**
 * Notification Service for UI Alerts and Toasts
 */
class NotificationService {
    constructor() {
        this.$container = this._createContainer();
    }

    _createContainer() {
        let $container = $('#notification-container');
        if ($container.length === 0) {
            $container = $('<div id="notification-container" class="toast-container position-fixed bottom-0 end-0 p-3"></div>');
            $('body').append($container);
        }
        return $container;
    }

    /**
     * Show success message
     */
    success(message, title = 'Success') {
        this.show(message, 'success', title);
    }

    /**
     * Show error message
     */
    error(message, title = 'Error') {
        this.show(message, 'danger', title);
    }

    /**
     * Show info message
     */
    info(message, title = 'Info') {
        this.show(message, 'info', title);
    }

    /**
     * Display toast notification
     */
    show(message, type = 'primary', title = '') {
        const toastId = `toast-${Date.now()}`;
        const toastHtml = `
            <div id="${toastId}" class="toast align-items-center text-white bg-${type} border-0" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${title ? `<strong>${title}</strong><br>` : ''}
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        this.$container.append(toastHtml);
        const $toastElement = $(`#${toastId}`);
        
        // Initialize Bootstrap toast if available, otherwise just show/hide
        if (window.bootstrap && window.bootstrap.Toast) {
            const toast = new bootstrap.Toast($toastElement[0]);
            toast.show();
        } else {
            $toastElement.fadeIn().delay(5000).fadeOut(() => $toastElement.remove());
        }
    }
}

export default new NotificationService();
