import CardiologyController from '../departments/cardiology.js';
import NeurologyController from '../departments/neurology.js';
import PediatricsController from '../departments/pediatrics.js';
import OrthopedicsController from '../departments/orthopedics.js';
import DermatologyController from '../departments/dermatology.js';
import OncologyController from '../departments/oncology.js';
import GastroenterologyController from '../departments/gastroenterology.js';
import EmergencyController from '../departments/emergency.js';
import GynecologyController from '../departments/gynecology.js';
import UrologyController from '../departments/urology.js';
import OphthalmologyController from '../departments/ophthalmology.js';
import RadiologyController from '../departments/radiology.js';
import InternalMedicineController from '../departments/internal-medicine.js';
import FamilyMedicineController from '../departments/family-medicine.js';
import RehabilitationController from '../departments/rehabilitation.js';
import PsychiatryController from '../departments/psychiatry.js';
import DentistryController from '../departments/dentistry.js';
import PulmonologyController from '../departments/pulmonology.js';
import EndocrinologyController from '../departments/endocrinology.js';
import NephrologyController from '../departments/nephrology.js';
import HematologyController from '../departments/hematology.js';
import EntServicesController from '../departments/ent-services.js';
import DepartmentsController from '../departments.js';

export default class DepartmentsModule {
    constructor() {
        this.name = 'Departments';
        this.mainController = new DepartmentsController();
        this.subModules = {
            cardiology: new CardiologyController(),
            neurology: new NeurologyController(),
            pediatrics: new PediatricsController(),
            orthopedics: new OrthopedicsController(),
            dermatology: new DermatologyController(),
            oncology: new OncologyController(),
            gastroenterology: new GastroenterologyController(),
            emergency: new EmergencyController(),
            gynecology: new GynecologyController(),
            urology: new UrologyController(),
            ophthalmology: new OphthalmologyController(),
            radiology: new RadiologyController(),
            internalMedicine: new InternalMedicineController(),
            familyMedicine: new FamilyMedicineController(),
            rehabilitation: new RehabilitationController(),
            psychiatry: new PsychiatryController(),
            dentistry: new DentistryController(),
            pulmonology: new PulmonologyController(),
            endocrinology: new EndocrinologyController(),
            nephrology: new NephrologyController(),
            hematology: new HematologyController(),
            entServices: new EntServicesController()
        };
    }

    init() {
        console.group('%c[PILLAR]: Departments Module Orchestrator Ready', 'color: #dc3545; font-weight: bold; font-size: 1.25em; text-decoration: underline;');
        this.fetchDepartmentsData();
        console.groupEnd();
    }

    async fetchDepartmentsData() {
        console.log('%c[DEPARTMENTS]: Engaging full clinical intelligence sync (8 Units)...', 'color: #fd7e14; font-style: italic;');
        // Load main directory
        this.mainController.init();
        // Load all specific department modules
        Object.values(this.subModules).forEach(sub => sub.init());
        console.log('%c[DEPARTMENTS]: Full clinical pillar manifest complete.', 'color: #fd7e14; font-weight: bold;');
    }
}
