from django.http import JsonResponse
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
)
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly

from .models import Team, User, Label, Repository, Project, Milestone, Task, Branch, Commit, Wiki, Page
from .serializers import TeamSerializer, ProjectSerializer, LabelSerializer, RepositorySerializer, UserSerializer, \
    MilestoneSerializer, BranchSerializer, CommitSerializer, WikiSerializer, PageSerializer


# U COMMAND PROMPTU: (nece da mi radi token u postmanu nzm sto)
# curl --header "Content-Type: Application/json"   --request POST   -H "Authorization: Token
# e091a4bf389ba85e3252cc7afc38e70db7bb20b7" --data "{"""title""":"""milestone1""","""labels""":[],
# """repository""":"""1"""}"   http://localhost:8000/milestone/

# curl --header "Content-Type: Application/json"   --request GET -H "Authorization: Token
# e091a4bf389ba85e3252cc7afc38e70db7bb20b7" http://localhost:8000/milestone/1/repo/

class MilestoneViewSet(GenericViewSet,
                       CreateModelMixin,
                       RetrieveModelMixin,
                       UpdateModelMixin,
                       ListModelMixin,
                       DestroyModelMixin
                       ):
    """
       Creates, Updates and Retrieves - Milestones
    """
    serializer_class = MilestoneSerializer
    authentication_classes = (TokenAuthentication,)
    queryset = Milestone.objects.all()

    def get_permissions(self):
        print(self.request.user)
        # allow full access to authenticated users, but allow read-only access to unauthenticated users
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super(MilestoneViewSet, self).get_permissions()

    #  http://localhost:8000/milestone/1/repo/
    @action(detail=True, methods=['get'], url_path='repo', url_name='repo')
    def milestones_by_repository(self, request, pk):
        '''
            Returns milestones for the specific repo
        '''
        # many == VISE OD JEDNOG IMA U REZULTATIMA FILTRIRANJA
        return Response(MilestoneSerializer(Milestone.objects.filter(repository__id=pk), many=True).data)


# to get token post : {
#     "username": "tamara",
#     "password": "adminadmin"
# } to localhost:8000/login/

# curl --header "Content-Type: Application/json"   --request POST   -H "Authorization: Token
# e091a4bf389ba85e3252cc7afc38e70db7bb20b7" --data "{"""name""":"""label1""","""color""":"""#FFFFFF""",
# """task""":"""1"""}"   http://localhost:8000/label/ u command promptu


class LabelViewSet(RetrieveModelMixin, UpdateModelMixin,
                   CreateModelMixin, ListModelMixin,
                   DestroyModelMixin, GenericViewSet):
    """
       Creates, Updates and Retrieves - Labels
    """

    serializer_class = LabelSerializer
    authentication_classes = (TokenAuthentication,)
    queryset = Label.objects.all()

    def get_permissions(self):
        print(self.request.user)
        # allow full access to authenticated users, but allow read-only access to unauthenticated users
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super(LabelViewSet, self).get_permissions()

    @action(detail=True, methods=['get'], url_path='repo', url_name='repo')
    def labels_by_repository(self, request, pk):
        '''
           Returns Labels for a specific repo
        '''
        return Response(LabelSerializer(Label.objects.filter(repository__id=pk)).data)

    @action(detail=True, methods=['get'], url_path='task', url_name='task')
    def labels_by_task(self, request, pk):
        '''
           Returns Labels for a specific task
        '''

        label_ids = Task.objects.filter(id=pk).values_list('labels', flat=True)
        return Response(LabelSerializer(Label.objects.filter(id__in=label_ids), many=True).data)

    # C:\Users\Tash>curl --header "Content-Type: Application/json"   --request GET -H "Authorization: Token
    # e091a4bf389ba85e3252cc7afc38e70db7bb20b7" http://localhost:8000/label/1/milestone/
    @action(detail=True, methods=['get'], url_path='milestone', url_name='milestone')
    def labels_by_milestone(self, request, pk):
        '''
           Returns Labels for a specific milestone
        '''

        label_ids = Milestone.objects.filter(id=pk).values_list('labels', flat=True)
        return Response(LabelSerializer(Label.objects.filter(id__in=label_ids), many=True).data)


class BranchViewSet(GenericViewSet,
                    CreateModelMixin,
                    RetrieveModelMixin,
                    UpdateModelMixin,
                    ListModelMixin,
                    DestroyModelMixin
                    ):
    """
          Creates, Updates and Retrieves - Branches
       """
    serializer_class = BranchSerializer
    authentication_classes = (TokenAuthentication,)
    queryset = Branch.objects.all()

    def get_permissions(self):
        print(self.request.user)
        # allow full access to authenticated users, but allow read-only access to unauthenticated users
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super(BranchViewSet, self).get_permissions()

    #  http://localhost:8000/branch/1/repo/
    @action(detail=True, methods=['get'], url_path='repo', url_name='repo')
    def branches_by_repository(self, request, pk):
        '''
            Returns branches for the specific repo
        '''
        # many == VISE OD JEDNOG IMA U REZULTATIMA FILTRIRANJA
        return Response(BranchSerializer(Branch.objects.filter(repository__id=pk), many=True).data)


class CommitViewSet(GenericViewSet,
                    CreateModelMixin,
                    RetrieveModelMixin,
                    UpdateModelMixin,
                    ListModelMixin,
                    DestroyModelMixin
                    ):
    """
          Creates, Updates and Retrieves - Commits
       """
    serializer_class = CommitSerializer
    authentication_classes = (TokenAuthentication,)
    queryset = Commit.objects.all()

    def get_permissions(self):
        print(self.request.user)
        # allow full access to authenticated users, but allow read-only access to unauthenticated users
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super(CommitViewSet, self).get_permissions()

    #  http://localhost:8000/commit/1/branch/
    @action(detail=True, methods=['get'], url_path='branch', url_name='branch')
    def commits_by_branch(self, request, pk):
        '''
            Returns branches for the specific branch
        '''
        # many == VISE OD JEDNOG IMA U REZULTATIMA FILTRIRANJA
        return Response(CommitSerializer(Commit.objects.filter(branch__id=pk), many=True).data)

    #  http://localhost:8000/commit/1/author/
    @action(detail=True, methods=['get'], url_path='author', url_name='author')
    def commits_by_author(self, request, pk):
        '''
            Returns branches for the specific user
        '''
        # many == VISE OD JEDNOG IMA U REZULTATIMA FILTRIRANJA
        return Response(CommitSerializer(Commit.objects.filter(author__id=pk), many=True).data)

    #  http://localhost:8000/commit/1/repo/
    @action(detail=True, methods=['get'], url_path='repo', url_name='repo')
    def commits_by_repository(self, request, pk):
        '''
            Returns branches for the specific repo
        '''
        # many == VISE OD JEDNOG IMA U REZULTATIMA FILTRIRANJA
        return Response(CommitSerializer(Commit.objects.filter(branch__repository__id=pk), many=True).data)


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


class WikiViewSet(GenericViewSet,
                  CreateModelMixin,
                  RetrieveModelMixin,
                  UpdateModelMixin,
                  ListModelMixin,
                  DestroyModelMixin
                  ):
    serializer_class = WikiSerializer
    queryset = Wiki.objects.all()


class PageViewSet(GenericViewSet,
                  CreateModelMixin,
                  RetrieveModelMixin,
                  UpdateModelMixin,
                  ListModelMixin,
                  DestroyModelMixin
                  ):
    serializer_class = PageSerializer
    queryset = Page.objects.all()
