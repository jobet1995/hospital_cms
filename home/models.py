from django.db import models

from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting

from .blocks import *


class HomePage(Page):
    body = StreamField(HomePageStreamBlock, blank=True)

    page_subtitle = models.CharField(max_length=255, blank=True, help_text="Optional subtitle for the page")
    featured_message = models.TextField(blank=True, help_text="Optional featured message to display prominently on the homepage")
    content_panels = Page.content_panels + [
        FieldPanel('body'),
    ]


@register_setting
class SiteSettings(BaseSiteSetting):
    navbar = StreamField(NavbarStreamBlock, blank=True)
    footer = StreamField(FooterStreamBlock, blank=True)

    support_email = models.EmailField(blank=True, help_text="Support email shown in footer")
    emergency_contact = models.CharField(max_length=50, blank=True, help_text="Emergency hotline number")

    panels = [
        StreamField('navbar'),
        StreamField('footer'),
    ]
