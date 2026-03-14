from django.conf import settings
from django.urls import include, path
from django.contrib import admin

from wagtail.admin import urls as wagtailadmin_urls
from wagtail import urls as wagtail_urls
from wagtail.documents import urls as wagtaildocs_urls

from search import views as search_views
from . import api

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("admin/", include(wagtailadmin_urls)),
    path("documents/", include(wagtaildocs_urls)),
    path("search/", search_views.search, name="search"),
    
    # Internal Hospital CMS API (v1)
    path("api/v1/doctors/", api.doctor_list, name="api_doctors"),
    path("api/v1/departments/", api.department_list, name="api_departments"),
    path("api/v1/appointments/book/", api.book_appointment, name="api_book"),
    path("api/v1/contact/submit/", api.contact_submit, name="api_contact"),
    path("api/v1/telemedicine/availability/", api.telemedicine_availability, name="api_telemedicine"),
    path("api/v1/research/publications/", api.research_publications, name="api_research"),
    path("api/v1/health-resources/", api.health_resources, name="api_resources"),
    path("api/v1/events/", api.events_list, name="api_events"),
    path("api/v1/feedback/", api.feedback_submit, name="api_feedback"),
    path("api/v1/newsletter/subscribe/", api.newsletter_subscribe, name="api_newsletter"),
    path("api/v1/emergency-alerts/", api.emergency_alerts, name="api_emergency"),
    path("api/v1/home/", api.home_data, name="api_home"),
    path("api/v1/search/", api.universal_search, name="api_search"),
]


if settings.DEBUG:
    from django.conf.urls.static import static
    from django.contrib.staticfiles.urls import staticfiles_urlpatterns

    # Serve static and media files from development server
    urlpatterns += staticfiles_urlpatterns()
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns = urlpatterns + [
    # For anything not caught by a more specific rule above, hand over to
    # Wagtail's page serving mechanism. This should be the last pattern in
    # the list:
    path("", include(wagtail_urls)),
    # Alternatively, if you want Wagtail pages to be served from a subpath
    # of your site, rather than the site root:
    #    path("pages/", include(wagtail_urls)),
]
