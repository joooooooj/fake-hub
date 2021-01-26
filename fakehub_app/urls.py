# backend/urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from fakehub_app import views

router = routers.DefaultRouter()
router.register(r'repository', views.RepoView, 'repository')
router.register(r'team', views.TeamView, 'team')
router.register(r'project', views.ProjectView, 'project')

urlpatterns = [
    path('', include(router.urls))
]