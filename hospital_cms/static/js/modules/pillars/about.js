import AboutUsController from '../about/about-us.js';
import HistoryController from '../about/history.js';
import MissionController from '../about/mission.js';
import LeadershipController from '../about/leadership.js';
import BoardController from '../about/board.js';
import FacilitiesController from '../about/facilities.js';
import TechnologyController from '../about/technology.js';
import AwardsController from '../about/awards.js';
import CommunityController from '../about/community.js';
import CareersController from '../about/careers.js';

export default class AboutModule {
    constructor() {
        this.name = 'About';
        this.subModules = {
            aboutUs: new AboutUsController(),
            history: new HistoryController(),
            mission: new MissionController(),
            leadership: new LeadershipController(),
            board: new BoardController(),
            facilities: new FacilitiesController(),
            technology: new TechnologyController(),
            awards: new AwardsController(),
            community: new CommunityController(),
            careers: new CareersController()
        };
    }

    init() {
        console.group('%c[PILLAR]: About Module Orchestrator Ready', 'color: #0d6efd; font-weight: bold; font-size: 1.25em; text-decoration: underline;');
        this.fetchAboutData();
        console.groupEnd();
    }

    async fetchAboutData() {
        console.log('%c[ABOUT]: Engaging full corporate intelligence sync (10 Sub-Modules)...', 'color: #0dcaf0; font-style: italic;');
        // Initializing all sub-modules concurrently for clinical console visibility
        Object.values(this.subModules).forEach(sub => sub.init());
        console.log('%c[ABOUT]: Full pillar manifest orchestration complete.', 'color: #0dcaf0; font-weight: bold;');
    }
}
