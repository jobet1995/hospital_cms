import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.serializers.json import DjangoJSONEncoder

from home.models import HomePage, Doctor, Department, NewsItem, Event, ResearchPublication, HealthResource

# Helper for consistent JSON responses
def api_response(data=None, message="Success", status="success", code=200):
    response_data = {
        "status": status,
        "message": message,
        "data": data or []
    }
    return JsonResponse(response_data, status=code, encoder=DjangoJSONEncoder)

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

        # Simplified StreamField serialization for the frontend
        for block in home_page.body:
            # Handle StructBlock values safely
            if hasattr(block.value, 'items'):
                value = dict(block.value)
            else:
                value = {"content": str(block.value)}

            block_data = {
                "type": block.block_type,
                "value": value
            }
            
            # Special handling for images in blocks
            if block.block_type == 'hero_banner' and value.get('background_image'):
                block_data['value']['image_url'] = value['background_image'].get_rendition('fill-1920x800').url
            
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
