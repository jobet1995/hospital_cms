# Project Guidelines

## Code Style
Follow Wagtail block design patterns as exemplified in [home/blocks.py](home/blocks.py). Use StructBlock for complex content structures, include descriptive help_text for all fields, and choose icons from Wagtail's built-in set. Reference [home/blocks.py](home/blocks.py) for field type conventions (CharBlock, TextBlock, ImageChooserBlock, etc.).

## Architecture
This is a Wagtail CMS project with a home app managing homepage content through StreamField blocks. Site-wide settings (navbar/footer) are injected into every page via SiteSettings. A separate search app handles paginated search functionality. Django settings are modular: base.py for shared config, dev.py for development, production.py for deployment.

## Build and Test
- Install dependencies: `pip install -r requirements.txt`
- Run development server: `python manage.py runserver`
- Run tests: `python manage.py test`
- Apply migrations: `python manage.py makemigrations && python manage.py migrate`
- Collect static files: `python manage.py collectstatic --noinput --clear`
- Docker build: `docker build -t hospital-cms .` and run with `docker run -p 8000:8000 hospital-cms`

## Conventions
- Consolidate all block definitions in [home/blocks.py](home/blocks.py) to avoid duplicates (currently partial in [hospital_cms/blocks.py](hospital_cms/blocks.py))
- Templates extend [hospital_cms/templates/base.html](hospital_cms/templates/base.html) and render StreamField blocks appropriately
- Static assets use Bootstrap 5 framework; add custom hospital branding to [hospital_cms/static/css/hospital_cms.css](hospital_cms/static/css/hospital_cms.css) and [hospital_cms/static/js/hospital_cms.js](hospital_cms/static/js/hospital_cms.js)
- Use SQLite for development; switch to PostgreSQL for production deployments
- Override settings locally in `hospital_cms/settings/local.py` (create if needed, add to .gitignore)</content>
<parameter name="filePath">d:\Wagtail\hospital_cms\.github\copilot-instructions.md