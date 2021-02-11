from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
)
from rest_framework.viewsets import GenericViewSet

from .models import Team
from .serializers import *


class TeamViewSet(GenericViewSet,  # generic view functionality
                  CreateModelMixin,  # handles POSTs
                  RetrieveModelMixin,  # handles GETs for 1 Team
                  UpdateModelMixin,  # handles PUTs and PATCHes
                  ListModelMixin,  # handles GETs for many Teams
                  DestroyModelMixin
                  ):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()

    # localhost:8000/team?user_id=2
    def get_queryset(self):
        if self.request.method == 'GET':
            user_id = self.request.GET.get('user_id', None)
            if user_id is not None:
                return Team.objects.all().filter(members__id=user_id)
            else:
                return Team.objects.all()
        else:
            return Project.objects.all()


class RepositoryViewSet(GenericViewSet,
                        CreateModelMixin,
                        RetrieveModelMixin,
                        UpdateModelMixin,
                        ListModelMixin,
                        DestroyModelMixin
                        ):
    serializer_class = RepositorySerializer
    queryset = Team.objects.all()

    # localhost:8000/repository?user_id=2
    def get_queryset(self):
        if self.request.method == 'GET':
            user_id = self.request.GET.get('user_id', None)
            if user_id is not None:
                return Repository.objects.all().filter(members__id=user_id)

            team_id = self.request.GET.get('team_id', None)
            if team_id is not None:
                return Repository.objects.all().filter(team__id=team_id)
            else:
                return Repository.objects.all()
        else:
            return Project.objects.all()


class ProjectViewSet(GenericViewSet,
                     CreateModelMixin,
                     RetrieveModelMixin,
                     UpdateModelMixin,
                     ListModelMixin,
                     DestroyModelMixin
                     ):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()

    def get_queryset(self):
        if self.request.method == 'GET':
            repo_id = self.request.GET.get('repo_id', None)
            if repo_id is not None:
                return Project.objects.all().filter(repository_id=repo_id)
            else:
                return Project.objects.all()
        else:
            return Project.objects.all()


class UserViewSet(GenericViewSet,
                  CreateModelMixin,
                  RetrieveModelMixin,
                  UpdateModelMixin,
                  ListModelMixin,
                  DestroyModelMixin
                  ):
    serializer_class = UserSerializer
    queryset = User.objects.all()
