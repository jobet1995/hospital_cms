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
    path("api/v1/about/general/", api.about_general, name="api_about_general"),
    path("api/v1/about/history/", api.about_history, name="api_about_history"),
    path("api/v1/about/mission-vision/", api.about_mission, name="api_about_mission"),
    path("api/v1/about/leadership/", api.about_leadership, name="api_about_leadership"),
    path("api/v1/about/board/", api.about_board, name="api_about_board"),
    path("api/v1/about/facilities/", api.about_facilities, name="api_about_facilities"),
    path("api/v1/about/technology/", api.about_technology, name="api_about_technology"),
    path("api/v1/about/awards/", api.about_awards, name="api_about_awards"),
    path("api/v1/about/community/", api.about_community, name="api_about_community"),
    path("api/v1/about/careers/", api.about_careers, name="api_about_careers"),
    path("api/v1/departments/cardiology/", api.dept_cardiology, name="api_dept_cardiology"),
    path("api/v1/departments/neurology/", api.dept_neurology, name="api_dept_neurology"),
    path("api/v1/departments/pediatrics/", api.dept_pediatrics, name="api_dept_pediatrics"),
    path("api/v1/departments/orthopedics/", api.dept_orthopedics, name="api_dept_orthopedics"),
    path("api/v1/departments/dermatology/", api.dept_dermatology, name="api_dept_dermatology"),
    path("api/v1/departments/oncology/", api.dept_oncology, name="api_dept_oncology"),
    path("api/v1/departments/gastroenterology/", api.dept_gastroenterology, name="api_dept_gastroenterology"),
    path("api/v1/departments/emergency/", api.dept_emergency, name="api_dept_emergency"),
    path("api/v1/departments/gynecology/", api.dept_gynecology, name="api_dept_gynecology"),
    path("api/v1/departments/urology/", api.dept_urology, name="api_dept_urology"),
    path("api/v1/departments/ophthalmology/", api.dept_ophthalmology, name="api_dept_ophthalmology"),
    path("api/v1/departments/radiology/", api.dept_radiology, name="api_dept_radiology"),
    path("api/v1/departments/internal-medicine/", api.dept_internal_medicine, name="api_dept_internal_medicine"),
    path("api/v1/departments/family-medicine/", api.dept_family_medicine, name="api_dept_family_medicine"),
    path("api/v1/departments/rehabilitation/", api.dept_rehabilitation, name="api_dept_rehabilitation"),
    path("api/v1/departments/psychiatry/", api.dept_psychiatry, name="api_dept_psychiatry"),
    path("api/v1/departments/dentistry/", api.dept_dentistry, name="api_dept_dentistry"),
    path("api/v1/departments/pulmonology/", api.dept_pulmonology, name="api_dept_pulmonology"),
    path("api/v1/departments/endocrinology/", api.dept_endocrinology, name="api_dept_endocrinology"),
    path("api/v1/departments/nephrology/", api.dept_nephrology, name="api_dept_nephrology"),
    path("api/v1/departments/hematology/", api.dept_hematology, name="api_dept_hematology"),
    path("api/v1/departments/ent-services/", api.dept_ent_services, name="api_dept_ent_services"),
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
