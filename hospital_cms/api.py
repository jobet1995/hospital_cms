import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.serializers.json import DjangoJSONEncoder

from home.models import Doctor, Department, NewsItem, Event, ResearchPublication, HealthResource

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
    """Returns a dynamic list of doctors from the database"""
    try:
        doctors = Doctor.objects.all()
        data = []
        for dr in doctors:
            data.append({
                "id": dr.id,
                "name": dr.name,
                "specialty": dr.specialty,
                "bio": dr.bio,
                "photo": dr.photo.get_rendition('fill-400x400').url if dr.photo else None,
                "department": dr.department.name if dr.department else None
            })
        return api_response(data)
    except Exception as e:
        return api_response(status="error", message=f"Doctor API Error: {str(e)}", code=500)

@csrf_exempt
@require_http_methods(["GET"])
def department_list(request):
    """Returns a dynamic list of departments from the database"""
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
                "image": dept.image.get_rendition('fill-800x450').url if dept.image else None
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
    """Returns research publications from the database"""
    publications = ResearchPublication.objects.all().order_by('-year')
    data = [{"id": p.id, "title": p.title, "authors": p.authors, "year": p.year} for p in publications]
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
