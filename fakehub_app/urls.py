# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import TeamViewSet, UserViewSet, RepositoryViewSet, ProjectViewSet, LabelViewSet, MilestoneViewSet, \
    BranchViewSet, CommitViewSet

# router = routers.SimpleRouter()
# router.register(r'team', TeamViewSet)
# router.register(r'user', UserViewSet)
# router.register(r'repository', RepositoryViewSet)
# router.register(r'project', ProjectViewSet)
# router.register(r'label', LabelViewSet)
# router.register(r'milestone', MilestoneViewSet)
# router.register(r'branch', BranchViewSet)
# router.register(r'commit', CommitViewSet)

urlpatterns = [
    path(r'team', TeamViewSet.as_view())
    path(r'user', UserViewSet.as_view())
    path(r'repository', RepositoryViewSet.as_view())
    path(r'project', ProjectViewSet.as_view())
    path(r'label', LabelViewSet.as_view())
    path(r'milestone', MilestoneViewSet.as_view())
    path(r'branch', BranchViewSet.as_view())
    pathr(r'commit', CommitViewSet.as_view())
]