# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from .views import TeamViewSet, UserViewSet, RepositoryViewSet, ProjectViewSet, LabelViewSet, MilestoneViewSet, \
    BranchViewSet, CommitViewSet, PageViewSet, FileViewSet, TaskViewSet, ColumnViewSet, \
    CustomObtainAuthToken

router = routers.SimpleRouter()
router.register(r'team', TeamViewSet)
router.register(r'user', UserViewSet)
router.register(r'repository', RepositoryViewSet, 'repository')
router.register(r'project', ProjectViewSet)
router.register(r'label', LabelViewSet)
router.register(r'milestone', MilestoneViewSet)
router.register(r'branch', BranchViewSet)
router.register(r'commit', CommitViewSet)
router.register(r'page', PageViewSet)
router.register(r'file', FileViewSet)
router.register(r'task', TaskViewSet)
router.register(r'column', ColumnViewSet)

urlpatterns = [
    path('', include((router.urls, 'api'), namespace='api')),
    path('authenticate/', CustomObtainAuthToken.as_view()),
    path('accounts/', include('django.contrib.auth.urls')),
]
