/**
 * Events Module - Handles event registration and calendar
 */
class EventsController {
    init() {
        console.log('Events module initialized');
        this.bindEvents();
    }

    bindEvents() {
        $('.btn-register-event').on('click', (e) => {
            const eventId = $(e.currentTarget).data('event-id');
            this.registerForEvent(eventId);
        });
    }

    registerForEvent(eventId) {
        console.log(`Registering for event ${eventId}`);
    }
}

export default EventsController;
