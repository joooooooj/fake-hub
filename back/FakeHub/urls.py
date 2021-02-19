from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include, reverse_lazy
from django.views.generic import TemplateView, RedirectView
from django.urls import path, include, re_path
from rest_framework.authtoken import views
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView

# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('login/', views.obtain_auth_token),
#     path('', include('fakehub_app.urls')),
# ]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', views.obtain_auth_token),
    path('api/',  include(('fakehub_app.urls','fakehub_app'),namespace='fakehub_app')),
    re_path(r'template\/.*', TemplateView.as_view(template_name='index.html')),

]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_URL)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
