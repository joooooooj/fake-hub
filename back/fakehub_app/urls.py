# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import TeamViewSet, UserViewSet, RepositoryViewSet, ProjectViewSet, LabelViewSet, MilestoneViewSet, \
    BranchViewSet, CommitViewSet, WikiViewSet, PageViewSet, FileViewSet

router = routers.SimpleRouter()
router.register(r'team', TeamViewSet)
router.register(r'user', UserViewSet)
router.register(r'repository', RepositoryViewSet)
router.register(r'project', ProjectViewSet)
router.register(r'label', LabelViewSet)
router.register(r'milestone', MilestoneViewSet)
router.register(r'branch', BranchViewSet)
router.register(r'commit', CommitViewSet)
router.register(r'wiki', WikiViewSet)
router.register(r'page', PageViewSet)
router.register(r'file', FileViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('accounts/', include('django.contrib.auth.urls')),
]
