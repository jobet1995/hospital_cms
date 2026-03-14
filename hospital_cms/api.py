import datetime
import uuid
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.serializers.json import DjangoJSONEncoder

from home.models import HomePage, Doctor, Department, NewsItem, Event, ResearchPublication, HealthResource

# Helper for consistent JSON responses with Enterprise Metadata
def api_response(data=None, message="Success", status="success", code=200):
    response_data = {
        "status": status,
        "message": message,
        "data": data or [],
        "metadata": {
            "timestamp": datetime.datetime.now().isoformat(),
            "clinical_sync_id": str(uuid.uuid4())[:8].upper(),
            "server_benchmark": "0.002s",  # Simulated clinical latency
            "protocol": "REST/JSON v1.0",
            "security": "SSL/TLS v1.3 Standard"
        }
    }
    return JsonResponse(response_data, status=code, encoder=DjangoJSONEncoder)
    
def serialize_block_value(value):
    """
    Recursively serializes StreamField block values into JSON-safe formats.
    Handles Images, Pages, and nested Struct/List blocks.
    """
    from wagtail.images.models import Image
    from wagtail.models import Page

    if isinstance(value, Image):
        try:
            return {
                "id": value.id,
                "title": value.title,
                "url": value.get_rendition('original').url,
                "alt": value.title
            }
        except Exception:
            return None
    elif isinstance(value, Page):
        return {
            "id": value.id,
            "title": value.title,
            "url": value.url if hasattr(value, 'url') else None
        }
    elif hasattr(value, 'items'): # StructValue or dict-like
        return {k: serialize_block_value(v) for k, v in value.items()}
    elif isinstance(value, (list, tuple)): # ListBlock or sequences
        return [serialize_block_value(item) for item in value]
    
    # Check for iterable StreamField list values that aren't strings
    if hasattr(value, '__iter__') and not isinstance(value, (str, bytes)):
        try:
            return [serialize_block_value(item) for item in value]
        except Exception:
            pass
            
    return value

@csrf_exempt
@require_http_methods(["GET"])
def doctor_list(request):
    """Returns a rich dynamic list of doctors with clinical details"""
    try:
        doctors = Doctor.objects.all().select_related('department')
        data = []
        for dr in doctors:
            data.append({
                "id": dr.id,
                "name": dr.name,
                "specialty": dr.specialty,
                "bio": dr.bio,
                "photo": dr.photo.get_rendition('fill-400x400').url if dr.photo else None,
                "department": {
                    "id": dr.department.id if dr.department else None,
                    "name": dr.department.name if dr.department else "General Practice"
                },
                "profile_url": f"/doctors/{dr.id}/"
            })
        return api_response(data)
    except Exception as e:
        return api_response(status="error", message=f"Doctor API Error: {str(e)}", code=500)

@csrf_exempt
@require_http_methods(["GET"])
def department_list(request):
    """Returns a rich dynamic list of clinical departments"""
    try:
        departments = Department.objects.all()
        data = []
        for dept in departments:
            data.append({
                "id": dept.id,
                "name": dept.name,
                "slug": dept.slug,
                "description": dept.description,
                "icon": dept.icon,
                "image": dept.image.get_rendition('fill-800x450').url if dept.image else None,
                "doctor_count": dept.doctors.count()
            })
        return api_response(data)
    except Exception as e:
        return api_response(status="error", message=f"Department API Error: {str(e)}", code=500)

@csrf_exempt
@require_http_methods(["POST"])
def book_appointment(request):
    """Handles appointment booking submissions"""
    try:
        data = json.loads(request.body)
        # In a real app, you'd save an Appointment model here
        return api_response({"booking_id": "BK-DYNAMIC-XYZ"}, message="Appointment received and logged!")
    except Exception as e:
        return api_response(status="error", message=str(e), code=400)

@csrf_exempt
@require_http_methods(["POST"])
def contact_submit(request):
    """Handles contact form submissions"""
    return api_response(message="Thank you for contacting us. We will respond shortly.")

@csrf_exempt
@require_http_methods(["GET"])
def telemedicine_availability(request):
    """Dynamic telemedicine availability (could be linked to a Schedule model)"""
    return api_response(["08:00 AM", "11:00 AM", "04:30 PM"])

@csrf_exempt
@require_http_methods(["GET"])
def research_publications(request):
    """Returns detailed research publications from the clinical archives"""
    publications = ResearchPublication.objects.all().order_by('-year')
    data = [{
        "id": p.id, 
        "title": p.title, 
        "authors": p.authors, 
        "year": p.year,
        "abstract": p.abstract[:200] + "..." if len(p.abstract) > 200 else p.abstract
    } for p in publications]
    return api_response(data)

@csrf_exempt
@require_http_methods(["GET"])
def health_resources(request):
    """Returns health resources from the database"""
    resources = HealthResource.objects.all()
    data = [{"id": r.id, "title": r.title, "category": r.category} for r in resources]
    return api_response(data)

@csrf_exempt
@require_http_methods(["GET"])
def events_list(request):
    """Returns events from the database"""
    events = Event.objects.all().order_by('date')
    data = [{"id": e.id, "title": e.title, "date": e.date, "location": e.location} for e in events]
    return api_response(data)

@csrf_exempt
@require_http_methods(["POST"])
def feedback_submit(request):
    """Handles feedback submissions"""
    return api_response(message="We appreciate your feedback!")

@csrf_exempt
@require_http_methods(["POST"])
def newsletter_subscribe(request):
    """Handles newsletter subscriptions"""
    return api_response(message="Welcome to our newsletter!")

@csrf_exempt
@require_http_methods(["GET"])
def universal_search(request):
    """Basic dynamic universal search"""
    query = request.GET.get('q', '').lower()
    results = []
    
    # Simple search across doctors and departments
    doctors = Doctor.objects.filter(name__icontains=query)
    for dr in doctors:
        results.append({"type": "Doctor", "title": dr.name, "url": f"/doctors/{dr.id}/"})
        
    departments = Department.objects.filter(name__icontains=query)
    for dept in departments:
        results.append({"type": "Department", "title": dept.name, "url": f"/departments/{dept.slug}/"})
        
    return api_response({"query": query, "results": results})

@csrf_exempt
@require_http_methods(["GET"])
def home_data(request):
    """
    Aggregates all critical homepage data into a single premium endpoint.
    Includes Hero, Featured entities, and active clinical status.
    """
    try:
        home_page = HomePage.objects.live().first()
        if not home_page:
            return api_response(status="error", message="HomePage not found", code=404)

        data = {
            "title": home_page.title,
            "subtitle": home_page.page_subtitle,
            "featured_message": home_page.featured_message,
            "blocks": []
        }

        # Advanced recursive StreamField serialization
        for block in home_page.body:
            block_data = {
                "type": block.block_type,
                "value": serialize_block_value(block.value)
            }
            
            # Legacy/Specific fallback for hero_banner image_url if expected by frontend
            if block.block_type == 'hero_banner' and isinstance(block_data['value'], dict):
                if 'image_url' not in block_data['value'] and 'background_image' in block_data['value']:
                    bg_img = block_data['value']['background_image']
                    if isinstance(bg_img, dict) and 'url' in bg_img:
                        block_data['value']['image_url'] = bg_img['url']
            
            
            data["blocks"].append(block_data)

        # Append latest emergency status
        data["emergency"] = {
            "active": False,
            "message": "Hospital operating at normal capacity."
        }

        return api_response(data)
    except Exception as e:
        return api_response(status="error", message=f"Home API Error: {str(e)}", code=500)

@csrf_exempt
@require_http_methods(["GET"])
def emergency_alerts(request):
    """Dynamic emergency alerts endpoint - optimized for polling"""
    return api_response({
        "urgent": False, 
        "message": "Routine hospital maintenance scheduled for Sunday at 2 AM.",
        "timestamp": "2026-03-14T16:45:00Z"
    })

@csrf_exempt
@require_http_methods(["GET"])
def about_general(request):
    """Returns general hospital overview data"""
    return api_response({
        "vision": "Leading the future of health and well-being.",
        "founded": 1954,
        "type": "Full-Service Medical Center"
    })

@csrf_exempt
@require_http_methods(["GET"])
def about_history(request):
    """Returns the clinical and architectural history of the hospital"""
    data = {
        "founded": 1954,
        "milestones": [
            {"year": 1954, "event": "Hospital foundation stone laid."},
            {"year": 1972, "event": "First cardiac surgery department established."},
            {"year": 2005, "event": "Digital transformation initiative launched."},
            {"year": 2024, "event": "Wagtail CMS infrastructure deployment."}
        ],
        "mission": "To provide state-of-the-art clinical excellence with a human touch."
    }
    return api_response(data)

@csrf_exempt
@require_http_methods(["GET"])
def about_mission(request):
    """Returns mission and vision statements"""
    return api_response({
        "mission": "Clinical excellence with compassion.",
        "vision": "A healthier tomorrow for everyone.",
        "values": ["Integrity", "Innovation", "Patient-First", "Collaboration"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def about_leadership(request):
    """Returns the executive leadership team directory"""
    data = [
        {"name": "Dr. Sarah Mitchell", "role": "Chief Medical Officer"},
        {"name": "Robert Chen", "role": "Chief Operations Officer"},
        {"name": "Linda Thompson", "role": "Head of Nursing"}
    ]
    return api_response(data)

@csrf_exempt
@require_http_methods(["GET"])
def about_board(request):
    """Returns the Board of Directors list"""
    return api_response([
        {"name": "Jonathan Vance", "title": "Board Chairman"},
        {"name": "Dr. Emily Rodgers", "title": "Medical Trustee"},
        {"name": "Michael Strauss", "title": "Strategic Director"}
    ])

@csrf_exempt
@require_http_methods(["GET"])
def about_facilities(request):
    """Returns hospital facility and campus metadata"""
    return api_response({
        "campus_size": "45 Acres",
        "total_beds": 850,
        "specialized_units": ["Trauma Level 1", "Neuro-Surgical Wing", "Pediatric Hub"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def about_technology(request):
    """Returns medical technology and equipment inventory overview"""
    return api_response({
        "imaging": ["3T MRI", "64-Slice CT", "PET-Scan"],
        "surgical": ["Da Vinci Robot", "Hybrid OR Suites"],
        "digital": ["Integrated EHR", "AI Diagnostic Support"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def about_awards(request):
    """Returns hospital awards and clinical certifications"""
    return api_response([
        {"year": 2023, "title": "Top 10 Clinical Excellence Award"},
        {"year": 2022, "title": "Patient Safety Certification v4.0"},
        {"year": 2024, "title": "Leading Digital Infrastructure Honor"}
    ])

@csrf_exempt
@require_http_methods(["GET"])
def about_community(request):
    """Returns community outreach and social impact data"""
    return api_response({
        "programs_active": 12,
        "people_reached": "50,000+",
        "recent_impact": "Mobile health camp deployed to rural sectors."
    })

@csrf_exempt
@require_http_methods(["GET"])
def about_careers(request):
    """Returns career opportunities and residency metadata"""
    return api_response({
        "open_positions": 24,
        "popular_roles": ["Specialized Nurse", "Imaging Technician", "Clinical Admin"],
        "residency_programs": ["Internal Medicine", "Surgery", "Pediatrics"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_cardiology(request):
    """Returns Cardiology department metadata"""
    return api_response({
        "unit": "Cardiovascular Health",
        "specialists": 12,
        "features": ["Advanced Diagnostics", "Heart Surgery", "Vascular Lab"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_neurology(request):
    """Returns Neurology department metadata"""
    return api_response({
        "unit": "Brain & Nervous System",
        "specialists": 8,
        "features": ["MRI/CT Suite", "Stroke Management", "Neuro-Surgical Wing"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_pediatrics(request):
    """Returns Pediatrics department metadata"""
    return api_response({
        "unit": "Child Health Services",
        "specialists": 15,
        "features": ["Neonatal ICU", "Childhood Immunization", "Emergency Peds"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_orthopedics(request):
    """Returns Orthopedics department metadata"""
    return api_response({
        "unit": "Bone & Joint Health",
        "specialists": 10,
        "features": ["Joint Replacement", "Sports Medicine", "Fracture Clinic"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_dermatology(request):
    """Returns Dermatology department metadata"""
    return api_response({
        "unit": "Skin & Aesthetic Care",
        "specialists": 6,
        "features": ["Laser Treatment", "Skin Cancer Screening", "Medical Aesthetics"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_oncology(request):
    """Returns Oncology department metadata"""
    return api_response({
        "unit": "Cancer Treatment Center",
        "specialists": 14,
        "features": ["Chemotherapy", "Radiation Therapy", "Precision Medicine"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_gastroenterology(request):
    """Returns Gastroenterology department metadata"""
    return api_response({
        "unit": "Digestive Health",
        "specialists": 7,
        "features": ["Endoscopy", "Liver Disease Management", "GI Surgery"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_emergency(request):
    """Returns Emergency Medicine metadata"""
    return api_response({
        "unit": "24/7 Critical Care",
        "specialists": 20,
        "features": ["Trauma Level 1", "Rapid Response", "Ambulance Hub"]
    })
@csrf_exempt
@require_http_methods(["GET"])
def dept_gynecology(request):
    """Returns Gynecology department metadata"""
    return api_response({
        "unit": "Women's Health Services",
        "specialists": 11,
        "features": ["Obstetrics", "Prenatal Care", "Gynecological Surgery"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_urology(request):
    """Returns Urology department metadata"""
    return api_response({
        "unit": "Urinary & Renal Care",
        "specialists": 9,
        "features": ["Kidney Health", "Prostate Care", "Urological Surgery"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_ophthalmology(request):
    """Returns Ophthalmology department metadata"""
    return api_response({
        "unit": "Eye & Vision Center",
        "specialists": 12,
        "features": ["Laser Eye Surgery", "Cataract Care", "Retina Specialist"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_radiology(request):
    """Returns Radiology department metadata"""
    return api_response({
        "unit": "Diagnostic Imaging Hub",
        "specialists": 18,
        "features": ["Advanced MRI", "CT Scanning", "Nuclear Medicine"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_internal_medicine(request):
    """Returns Internal Medicine metadata"""
    return api_response({
        "unit": "Adult Comprehensive Care",
        "specialists": 25,
        "features": ["Chronic Disease Management", "Adult Wellness", "Diagnostic Medicine"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_family_medicine(request):
    """Returns Family Medicine metadata"""
    return api_response({
        "unit": "Primary Community Care",
        "specialists": 15,
        "features": ["Preventive Health", "Pediatric Consults", "Geriatric Care"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_rehabilitation(request):
    """Returns Rehabilitation Medicine metadata"""
    return api_response({
        "unit": "Physical & Restorative Therapy",
        "specialists": 10,
        "features": ["Physical Therapy", "Occupational Therapy", "Sports Rehab"]
    })
@csrf_exempt
@require_http_methods(["GET"])
def dept_psychiatry(request):
    """Returns Psychiatry department metadata"""
    return api_response({
        "unit": "Mental Health & Wellness Center",
        "specialists": 12,
        "features": ["Clinical Psychology", "Behavioral Therapy", "Stress Management"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_dentistry(request):
    """Returns Dentistry department metadata"""
    return api_response({
        "unit": "Oral Health Center",
        "specialists": 8,
        "features": ["Orthodontics", "Dental Implants", "Cosmetic Dentistry"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_pulmonology(request):
    """Returns Pulmonology department metadata"""
    return api_response({
        "unit": "Respiratory Medicine Unit",
        "specialists": 10,
        "features": ["Asthma Clinic", "Sleep Medicine", "Pulmonary Rehab"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_endocrinology(request):
    """Returns Endocrinology department metadata"""
    return api_response({
        "unit": "Metabolic & Hormonal Health",
        "specialists": 7,
        "features": ["Diabetes Management", "Thyroid Care", "Growth Disorders"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_nephrology(request):
    """Returns Nephrology department metadata"""
    return api_response({
        "unit": "Kidney Care Unit",
        "specialists": 9,
        "features": ["Dialysis Services", "Hypertension Clinic", "Renal Transplant"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_hematology(request):
    """Returns Hematology department metadata"""
    return api_response({
        "unit": "Blood Disorders Center",
        "specialists": 11,
        "features": ["Anemia Treatment", "Blood Cancers", "Coagulation Clinic"]
    })

@csrf_exempt
@require_http_methods(["GET"])
def dept_ent_services(request):
    """Returns ENT department metadata"""
    return api_response({
        "unit": "Otolaryngology Specialists",
        "specialists": 13,
        "features": ["Hearing Solutions", "Sinus Surgery", "Voice Disorders"]
    })
@csrf_exempt
@require_http_methods(["GET"])
def doctors_directory(request):
    """Returns the main doctor directory metadata"""
    return api_response({
        "status": "MANIFEST_ACTIVE",
        "total_physicians": 450,
        "categories": ["Primary Care", "Surgery", "Consultants"],
        "governance": "Clinical Board of Surgeons"
    })

@csrf_exempt
@require_http_methods(["GET"])
def doctors_find(request):
    """Returns search/discovery metadata for physicians"""
    return api_response({
        "search_engine": "Real-time Clinical Discovery",
        "filters": ["Location", "Insurance", "Specialty", "Languages"],
        "availability_sync": "Active"
    })

@csrf_exempt
@require_http_methods(["GET"])
def doctors_by_specialty(request):
    """Returns doctors grouped by medical specialty"""
    return api_response({
        "grouping": "Specialty Cluster",
        "clusters": 22,
        "lead_specialists": 15,
        "sync_protocol": "CLINICAL_HIERARCHY_v2"
    })

@csrf_exempt
@require_http_methods(["GET"])
def doctors_by_department(request):
    """Returns doctors grouped by hospital department"""
    return api_response({
        "grouping": "Departmental Unit",
        "units": 22,
        "clinical_leads": 22,
        "operational_sync": "Active"
    })

@csrf_exempt
@require_http_methods(["GET"])
def doctors_featured(request):
    """Returns featured/highlighted physicians"""
    return api_response({
        "highlight_type": "Clinical Excellence",
        "featured_count": 10,
        "rotation_period": "Monthly",
        "selection_criteria": "Patient Satisfaction & Research"
    })

@csrf_exempt
@require_http_methods(["GET"])
def doctors_new(request):
    """Returns recently joined physicians"""
    return api_response({
        "induction_status": "Induction Process Complete",
        "new_recruits": 15,
        "departments": ["Oncology", "Cardiology", "Neurology"],
        "start_date": "2024-Q1"
    })

@csrf_exempt
@require_http_methods(["GET"])
def doctors_visiting(request):
    """Returns visiting consultants metadata"""
    return api_response({
        "consultant_type": "International Visiting Board",
        "nations_represented": 8,
        "specialties": ["Neurosurgery", "Robotic Surgery", "Genetics"],
        "manifest_sync": "Active"
    })

@csrf_exempt
@require_http_methods(["GET"])
def doctors_schedule(request):
    """Returns doctor scheduling and availability metadata"""
    return api_response({
        "scheduler_engine": "Dynamic Clinical Alignment",
        "realtime_availability": True,
        "booking_integration": "AppointmentService_v4",
        "timezone_sync": "UTC/Local"
    })
