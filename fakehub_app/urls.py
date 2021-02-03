# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('team', TeamViewSet)
router.register('user', UserViewSet)
router.register('repository', RepositoryViewSet)
router.register('project', ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('accounts/', include('django.contrib.auth.urls'))
]