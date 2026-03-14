from wagtail import hooks
from wagtail.admin.userbar import AccessibilityItem

@hooks.register("construct_wagtail_userbar")
def remove_accessibility_checker(request, items):
    # Remove the accessibility check item to prevent axe.run from cluttering the console
    items[:] = [item for item in items if not isinstance(item, AccessibilityItem)]
