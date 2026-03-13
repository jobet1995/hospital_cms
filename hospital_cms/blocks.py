from wagtail import blocks
from wagtail.images.blocks import ImageChooserBlock


class NavLinkBlock(blocks.StructBlock):
    label = blocks.CharBlock(required=True, help_text="Link text")
    url = blocks.URLBlock(required=True, help_text="Link URL")
    sub_links = blocks.ListBlock(
        blocks.StructBlock([
            ("label", blocks.CharBlock(required=True)),
            ("url", blocks.URLBlock(required=True))
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