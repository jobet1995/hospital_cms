import DoctorsController from '../doctors.js';
import DoctorDirectoryController from '../doctors/directory.js';
import FindDoctorController from '../doctors/find.js';
import SpecialtyController from '../doctors/specialty.js';
import DepartmentDoctorController from '../doctors/department.js';
import FeaturedDoctorsController from '../doctors/featured.js';
import NewDoctorsController from '../doctors/new.js';
import VisitingConsultantsController from '../doctors/visiting.js';
import DoctorScheduleController from '../doctors/schedule.js';

export default class DoctorsModule {
    constructor() {
        this.name = 'Doctors';
        this.mainController = new DoctorsController();
        this.subModules = {
            directory: new DoctorDirectoryController(),
            find: new FindDoctorController(),
            specialty: new SpecialtyController(),
            department: new DepartmentDoctorController(),
            featured: new FeaturedDoctorsController(),
            new: new NewDoctorsController(),
            visiting: new VisitingConsultantsController(),
            schedule: new DoctorScheduleController()
        };
    }

    init() {
        console.group('%c[PILLAR]: Doctors Manifest v2.0 Initializing...', 'background: #2c3e50; color: #3498db; font-weight: bold; padding: 2px 5px;');
        this.mainController.init();
        
        // Parallel sync of all clinical doctor sub-manifests
        Object.values(this.subModules).forEach(sub => {
            if (typeof sub.init === 'function') {
                sub.init();
            }
        });
        
        console.groupEnd();
    }
}
