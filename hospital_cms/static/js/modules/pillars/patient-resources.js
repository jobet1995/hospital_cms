/**
 * Patient Resources Pillar Module
 * Manages Health Research, Articles, and Events.
 */
import ResearchController from '../research.js';
import ResourcesController from '../resources.js';
import EventsController from '../events.js';

export default class PatientResourcesModule {
    constructor() {
        this.research = new ResearchController();
        this.resources = new ResourcesController();
        this.events = new EventsController();
    }

    init() {
        console.group('[PILLAR]: Patient Resources Module Initializing...');
        this.research.init();
        this.resources.init();
        this.events.init();
        console.groupEnd();
    }
}
