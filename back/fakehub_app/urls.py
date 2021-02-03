# backend/urls.py

from django.contrib import admin
from django.urls import path, include                 # add this
from rest_framework import routers                    # add this
from fakehub_app import views                            # add this

router = routers.DefaultRouter()                      # add this
router.register(r'repository', views.RepoView, 'repository')     # add this

urlpatterns = [
    path('', include(router.urls))
]