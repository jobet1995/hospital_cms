from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock


class HeroBannerBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True, help_text="Main title for the hero banner")
    subtitle = blocks.TextBlock(required=False, help_text="Optional subtitle text")
    cta_button = blocks.StructBlock([
        ('text', blocks.CharBlock(required=True, help_text="Button text")),
        ('link', blocks.URLBlock(required=True, help_text="Button link URL")),
    ], required=False, help_text="Call to action button")
    background_image = ImageChooserBlock(required=False, help_text="Background image for the banner")

    class Meta:
        icon = 'image'
        label = 'Hero Banner'
        template = 'blocks/hero_banner.html'


class DepartmentCardBlock(blocks.StructBlock):
    name = blocks.CharBlock(required=True, help_text="Department name")
    description = blocks.RichTextBlock(required=False, help_text="Department description")
    link = blocks.URLBlock(required=False, help_text="Link to department page")
    image = ImageChooserBlock(required=False, help_text="Department image")

    class Meta:
        icon = 'folder'
        label = 'Department Card'
        template = 'blocks/department_card.html'


class DoctorCardBlock(blocks.StructBlock):
    name = blocks.CharBlock(required=True, help_text="Doctor's name")
    specialty = blocks.CharBlock(required=True, help_text="Doctor's specialty")
    photo = ImageChooserBlock(required=False, help_text="Doctor's photo")
    link = blocks.URLBlock(required=False, help_text="Link to doctor's profile")

    class Meta:
        icon = 'user'
        label = 'Doctor Card'
        template = 'blocks/doctor_card.html'


class TipBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True, help_text="Tip title")
    description = blocks.TextBlock(required=True, help_text="Tip description")
    icon = ImageChooserBlock(required=False, help_text="Tip icon or image")

    class Meta:
        icon = 'help'
        label = 'Health Tip'
        template = 'blocks/health_tip.html'


class NewsCardBlock(blocks.StructBlock):
    headline = blocks.CharBlock(required=True, help_text="News headline")
    date = blocks.DateBlock(required=True, help_text="Publication date")
    summary = blocks.TextBlock(required=True, help_text="News summary")
    link = blocks.URLBlock(required=False, help_text="Link to full article")

    class Meta:
        icon = 'doc-full'
        label = 'News Card'
        template = 'blocks/news_card.html'


class EmergencyBannerBlock(blocks.StructBlock):
    message = blocks.TextBlock(required=True, help_text="Emergency message")
    icon = ImageChooserBlock(required=False, help_text="Emergency icon")
    urgency_level = blocks.ChoiceBlock(choices=[
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ], required=True, help_text="Urgency level")
    link = blocks.URLBlock(required=False, help_text="Link for more info")

    class Meta:
        icon = 'warning'
        label = 'Emergency Banner'
        template = 'blocks/emergency_banner.html'


class TestimonialBlock(blocks.StructBlock):
    patient_name = blocks.CharBlock(required=True, help_text="Patient's name")
    photo = ImageChooserBlock(required=False, help_text="Patient's photo")
    testimonial_text = blocks.RichTextBlock(required=True, help_text="Testimonial text")
    rating = blocks.IntegerBlock(min_value=1, max_value=5, required=True, help_text="Rating out of 5")

    class Meta:
        icon = 'comment'
        label = 'Testimonial'
        template = 'blocks/testimonial.html'


class QuickLinkBlock(blocks.StructBlock):
    label = blocks.CharBlock(required=True, help_text="Link label")
    icon = blocks.CharBlock(required=False, help_text="CSS class for icon")
    link = blocks.URLBlock(required=True, help_text="Link URL")

    class Meta:
        icon = 'link'
        label = 'Quick Link'
        template = 'blocks/quick_link.html'


class NavLinkBlock(blocks.StructBlock):
    label = blocks.CharBlock(required=True, help_text="Link text")
    url = blocks.URLBlock(required=True, help_text="Link URL")
    sub_links = blocks.ListBlock(
        blocks.StructBlock([
            ("label", blocks.CharBlock(required=True)),
            ("url", blocks.URLBlock(required=True)),
            ("description", blocks.CharBlock(required=False, help_text="Short description for mega-menu"))
        ]), required=False, help_text="Sub-links for dropdown"
    )

    class Meta:
        icon = 'link'
        label = 'Navigation Link'


class NavbarBlock(blocks.StructBlock):
    logo = ImageChooserBlock(required=True, help_text="Site logo")
    logo_link = blocks.URLBlock(required=True, help_text="Logo link URL")
    nav_links = blocks.ListBlock(NavLinkBlock(), help_text="Primary navigation links")
    search_enabled = blocks.BooleanBlock(default=False, help_text="Enable search bar")
    cta_button = blocks.StructBlock([
        ("text", blocks.CharBlock(required=True)),
        ("url", blocks.URLBlock(required=True))
    ], required=False, help_text="CTA button")

    class Meta:
        icon = 'cog'
        label = 'Navbar'
        template = 'blocks/navbar.html'


class FooterLinkBlock(blocks.StructBlock):
    label = blocks.CharBlock(required=True)
    url = blocks.URLBlock(required=True)

    class Meta:
        icon = 'link'
        label = 'Footer Link'


class SocialMediaBlock(blocks.StructBlock):
    platform = blocks.ChoiceBlock(choices=[
        ('facebook', 'Facebook'),
        ('twitter', 'Twitter'),
        ('instagram', 'Instagram'),
        ('linkedin', 'LinkedIn')
    ], required=True)
    url = blocks.URLBlock(required=True)
    icon = ImageChooserBlock(required=False)

    class Meta:
        icon = 'group'
        label = 'Social Media Link'


class FooterBlock(blocks.StructBlock):
    quick_links = blocks.ListBlock(FooterLinkBlock())
    contact_info = blocks.StructBlock([
        ("phone", blocks.CharBlock(required=True)),
        ("email", blocks.EmailBlock(required=True)),
        ("address", blocks.TextBlock(required=True))
    ])
    emergency_hotline = blocks.CharBlock(required=True)
    social_links = blocks.ListBlock(SocialMediaBlock())
    newsletter_form = blocks.BooleanBlock(default=False)

    class Meta:
        icon = 'doc-full'
        label = 'Footer'
        template = 'blocks/footer.html'


class NavbarStreamBlock(blocks.StreamBlock):
    navbar = NavbarBlock()

    class Meta:
        max_num = 1


class FooterStreamBlock(blocks.StreamBlock):
    footer = FooterBlock()

    class Meta:
        max_num = 1


class DepartmentHeroBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True)
    subtitle = blocks.TextBlock(required=False)
    background_image = ImageChooserBlock(required=True)
    unit_code = blocks.CharBlock(required=False, help_text="e.g., CARD-01")
    
    class Meta:
        icon = 'title'
        label = 'Department Hero'
        template = 'blocks/departments/department_hero.html'


class ExpertiseBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True, default="Specialized Clinical Expertise")
    items = blocks.ListBlock(blocks.StructBlock([
        ('procedure', blocks.CharBlock(required=True)),
        ('description', blocks.TextBlock(required=True)),
        ('success_rate', blocks.CharBlock(required=False, help_text="e.g., 98%")),
        ('icon', blocks.CharBlock(required=False, help_text="FontAwesome icon class"))
    ]))

    class Meta:
        icon = 'pick'
        label = 'Clinical Expertise'
        template = 'blocks/departments/expertise.html'


class FacilitySpotlightBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True, default="Advanced Medical Technology")
    description = blocks.TextBlock(required=True)
    facilities = blocks.ListBlock(blocks.StructBlock([
        ('name', blocks.CharBlock(required=True)),
        ('image', ImageChooserBlock(required=True)),
        ('details', blocks.TextBlock(required=True))
    ]))

    class Meta:
        icon = 'site'
        label = 'Facility Spotlight'
        template = 'blocks/departments/facility_spotlight.html'


class PatientGuideBlock(blocks.StructBlock):
    title = blocks.CharBlock(required=True, default="Patient Resources & Preparation")
    guides = blocks.ListBlock(blocks.StructBlock([
        ('heading', blocks.CharBlock(required=True)),
        ('content', blocks.RichTextBlock(required=True)),
        ('download_label', blocks.CharBlock(required=False)),
        ('download_link', blocks.URLBlock(required=False))
    ]))

    class Meta:
        icon = 'help'
        label = 'Patient Guide'
        template = 'blocks/departments/patient_guide.html'


class ClinicalTeamBlock(blocks.StaticBlock):
    class Meta:
        icon = 'group'
        label = 'Clinical Team'
        admin_text = 'Displays doctors associated with this department automatically.'
        template = 'blocks/departments/clinical_team.html'


class DepartmentPageStreamBlock(blocks.StreamBlock):
    hero = DepartmentHeroBlock()
    expertise = ExpertiseBlock()
    facilities = FacilitySpotlightBlock()
    patient_guide = PatientGuideBlock()
    clinical_team = ClinicalTeamBlock()
    rich_text = blocks.RichTextBlock()

    class Meta:
        label = 'Department Page Content'


class HomePageStreamBlock(blocks.StreamBlock):
    hero_banner = HeroBannerBlock()
    featured_departments = blocks.ListBlock(DepartmentCardBlock())
    featured_doctors = blocks.ListBlock(DoctorCardBlock())
    health_tips = blocks.ListBlock(TipBlock())
    news = blocks.ListBlock(NewsCardBlock())
    emergency_banner = EmergencyBannerBlock()
    testimonials = blocks.ListBlock(TestimonialBlock())
    quick_links = blocks.ListBlock(QuickLinkBlock())

    class Meta:
        icon = 'home'
        label = 'Home Page Blocks'