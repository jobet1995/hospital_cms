from django.db import models

from wagtail import blocks
from wagtail.models import Page
from wagtail.fields import StreamField
from wagtail.admin.panels import FieldPanel, MultiFieldPanel
from wagtail.contrib.settings.models import BaseSiteSetting, register_setting
from wagtail.snippets.models import register_snippet

from .blocks import *


@register_setting
class SiteSettings(BaseSiteSetting):
    navbar = StreamField(NavbarStreamBlock, blank=True, use_json_field=True)
    footer = StreamField(FooterStreamBlock, blank=True, use_json_field=True)

    support_email = models.EmailField(blank=True, help_text="Support email shown in footer")
    emergency_contact = models.CharField(max_length=50, blank=True, help_text="Emergency hotline number")

    panels = [
        FieldPanel('navbar'),
        FieldPanel('footer'),
        MultiFieldPanel([
            FieldPanel('support_email'),
            FieldPanel('emergency_contact'),
        ], heading="Contact Information"),
    ]

    class Meta:
        verbose_name = "Site Settings"


@register_snippet
class Department(models.Model):
    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=100, blank=True, help_text="FontAwesome icon class")
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.SET_NULL, null=True, blank=True, related_name='+'
    )

    panels = [
        FieldPanel('name'),
        FieldPanel('slug'),
        FieldPanel('description'),
        FieldPanel('icon'),
        FieldPanel('image'),
    ]

    def __str__(self):
        return self.name


@register_snippet
class Doctor(models.Model):
    name = models.CharField(max_length=255)
    specialty = models.CharField(max_length=255)
    bio = models.TextField(blank=True)
    department = models.ForeignKey(Department, on_delete=models.SET_NULL, null=True, blank=True, related_name='doctors')
    photo = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.SET_NULL, null=True, blank=True, related_name='+'
    )

    panels = [
        FieldPanel('name'),
        FieldPanel('specialty'),
        FieldPanel('bio'),
        FieldPanel('department'),
        FieldPanel('photo'),
    ]

    def __str__(self):
        return self.name


@register_snippet
class NewsItem(models.Model):
    headline = models.CharField(max_length=255)
    date = models.DateField()
    summary = models.TextField()
    image = models.ForeignKey(
        'wagtailimages.Image', on_delete=models.SET_NULL, null=True, blank=True, related_name='+'
    )

    panels = [
        FieldPanel('headline'),
        FieldPanel('date'),
        FieldPanel('summary'),
        FieldPanel('image'),
    ]

    def __str__(self):
        return self.headline


@register_snippet
class Event(models.Model):
    title = models.CharField(max_length=255)
    date = models.DateField()
    location = models.CharField(max_length=255, blank=True)
    description = models.TextField()

    panels = [
        FieldPanel('title'),
        FieldPanel('date'),
        FieldPanel('location'),
        FieldPanel('description'),
    ]

    def __str__(self):
        return self.title


@register_snippet
class ResearchPublication(models.Model):
    title = models.CharField(max_length=255)
    authors = models.CharField(max_length=255)
    year = models.IntegerField()
    abstract = models.TextField()

    panels = [
        FieldPanel('title'),
        FieldPanel('authors'),
        FieldPanel('year'),
        FieldPanel('abstract'),
    ]

    def __str__(self):
        return self.title


@register_snippet
class HealthResource(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    content = models.TextField()

    panels = [
        FieldPanel('title'),
        FieldPanel('category'),
        FieldPanel('content'),
    ]

    def __str__(self):
        return self.title


class HomePage(Page):
    body = StreamField(HomePageStreamBlock, blank=True)

    page_subtitle = models.CharField(max_length=255, blank=True, help_text="Optional subtitle for the page")
    featured_message = models.TextField(blank=True, help_text="Optional featured message to display prominently on the homepage")
    content_panels = Page.content_panels + [
        FieldPanel('page_subtitle'),
        FieldPanel('featured_message'),
        FieldPanel('body'),
    ]


