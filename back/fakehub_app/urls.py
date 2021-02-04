# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import TeamViewSet, UserViewSet, RepositoryViewSet, ProjectViewSet, LabelViewSet

router = routers.DefaultRouter()
router.register('team', TeamViewSet)
router.register('user', UserViewSet)
router.register('repository', RepositoryViewSet)
router.register('project', ProjectViewSet)
router.register('label', LabelViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('accounts/', include('django.contrib.auth.urls')),
]