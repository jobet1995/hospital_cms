/**
 * Home Pillar Module
 * Orchestrates the homepage experience and core hero interactions.
 */
import HomepageController from '../homepage.js';

export default class HomeModule {
    constructor() {
        this.homepage = new HomepageController();
    }

    init() {
        console.log('[PILLAR]: Home Module Initializing...');
        this.homepage.init();
    }
}
