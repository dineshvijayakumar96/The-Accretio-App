from django.contrib import admin
from django.urls import path, include
from . import settings
from django.conf.urls.static import static

urlpatterns = [
    path('accretio-admin/', admin.site.urls),
    path('', include('theaccretio.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)