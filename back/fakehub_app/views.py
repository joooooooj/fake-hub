from rest_framework import viewsets
from .models import Project
from .serializers import *


class RepoView(viewsets.ModelViewSet):
    serializer_class = RepoSerializer
    queryset = Repository.objects.all()


class TeamView(viewsets.ModelViewSet):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()


class ProjectView(viewsets.ModelViewSet):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
