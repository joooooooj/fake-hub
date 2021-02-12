# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import TeamViewSet, UserViewSet, RepositoryViewSet, ProjectViewSet, LabelViewSet, MilestoneViewSet

router = routers.SimpleRouter()
router.register(r'team', TeamViewSet)
router.register(r'user', UserViewSet)
router.register(r'repository', RepositoryViewSet)
router.register(r'project', ProjectViewSet)
router.register(r'label', LabelViewSet)
router.register(r'milestone', MilestoneViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('accounts/', include('django.contrib.auth.urls')),
]