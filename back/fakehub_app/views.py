from collections import Counter

from django.http import JsonResponse
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.mixins import (
    CreateModelMixin, ListModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
)
from rest_framework.viewsets import GenericViewSet
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .models import Team, User, Label, Repository, Project, Milestone, Task, Branch, Commit, Page, File, Status, \
    Column
from .serializers import TeamSerializer, ProjectSerializer, LabelSerializer, RepositorySerializer, UserSerializer, \
    MilestoneSerializer, BranchSerializer, CommitSerializer, PageSerializer, FileSerializer, \
    TaskSerializer, ColumnSerializer, RepoSaveSerializer, TaskSaveSerializer, TeamSaveSerializer, ColumnSaveSerializer


class CustomObtainAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        response = super(CustomObtainAuthToken, self).post(request, *args, **kwargs)
        token = Token.objects.get(key=response.data['token'])
        return Response({'token': token.key, 'id': token.user_id})


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
        print(self.request)
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
        # many == VISE OD JEDNpostOG IMA U REZULTATIMA FILTRIRANJA
        return Response(CommitSerializer(Commit.objects.filter(author__id=pk), many=True).data)

    #  http://localhost:8000/commit/1/repo/
    @action(detail=True, methods=['get'], url_path='repo', url_name='repo')
    def commits_by_repository(self, request, pk):
        '''
            Returns branches for the specific repo
        '''
        # many == VISE OD JEDNOG IMA U REZULTATIMA FILTRIRANJA
        return Response(CommitSerializer(Commit.objects.all(), many=True).data)

    @action(detail=True, methods=['get'], url_path='insights', url_name='insights')
    def get_insights(self, request, pk):
        '''
            Returns insights for repo
        '''

        data = {"colab": [], "info": []}
        for item in Commit.objects.all().values('author'):
            username = User.objects.filter(id=item['author'])[0].username

            if username not in data['colab']:
                data['colab'].append(username)

        data['info'] = CommitSerializer(Commit.objects.all(), many=True).data

        return Response(data)

    @action(detail=True, methods=['get'], url_path='counts', url_name='counts')
    def get_counts(self, request, pk):

        '''
            Returns insights for repo
        '''

        counts = []
        objs = []
        for item in Commit.objects.all().values('author'):
            username = User.objects.filter(id=item['author'])[0].username

            objs.append(username)

        for k,v in Counter(objs).items():
            counts.append((k,v))
        return Response(counts)


class TeamViewSet(GenericViewSet,  # generic view functionality

                  RetrieveModelMixin,  # handles GETs for 1 Team
                  UpdateModelMixin,  # handles PUTs and PATCHes
                  ListModelMixin,  # handles GETs for many Teams
                  DestroyModelMixin
                  ):
    serializer_class = TeamSerializer
    queryset = Team.objects.all()
    authentication_classes = (TokenAuthentication,)

    def create(self, request, *args, **kwargs):
        if request.method != 'PUT':
            team = Team()
            team.name = request.data['name']
            team.owner = User.objects.filter(id=request.data['owner'])[0]

            # serializer = TeamSaveSerializer(data=team)
            # serializer.is_valid(raise_exception=True)

            print(request.data['members'])
            users = User.objects.filter(username__in=request.data['members'])
            instance = Team.objects.create(name=request.data['name'], owner_id=request.data['owner'])

            instance.members.set(users)

        return Response({}, status=status.HTTP_201_CREATED)

    def update(self, request, *args, **kwargs):
        print(request.data['members'])
        users = User.objects.filter(username__in=request.data['members'])
        team = Team.objects.filter(id=request.data['id'])[0]
        team.members.set(users)
        print(team.members)
        Team.save(team)
        print(Team.objects.filter(id=request.data['id']))
        return Response({}, status=status.HTTP_201_CREATED)

    def get_permissions(self):
        print(self.request.data)
        # allow full access to authenticated users, but allow read-only access to unauthenticated users
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super(TeamViewSet, self).get_permissions()

    @action(detail=True, methods=['get'], url_path='user', url_name='user')
    def teams_by_user(self, request, pk):
        '''
            Returns teams for the specific user
        '''

        return Response(TeamSerializer(Team.objects.filter(members__id=pk), many=True).data)

    @action(detail=True, methods=['post'], url_path='leave', url_name='leave')
    def leave_team(self, request, pk):
        '''
            Leave team
        '''

        team = Team.objects.filter(id=pk)[0]
        print(team)
        ids = []
        for m in request.data['members']:
            ids.append(m['id'])
        team.members.set(ids)
        Team.save(team)
        return Response(TeamSerializer(Team.objects.filter(members__id=pk), many=True).data)


# class RepositoryCreateViewSet(CreateModelMixin):
#     serializer_class = RepoSaveSerializer
#     authentication_classes = (TokenAuthentication,)
#     queryset = Repository.objects.all()
#
#     # def get_permissions(self):
#     #     print(self.request.data)
#     #     # allow full access to authenticated users, but allow read-only access to unauthenticated users
#     #     self.permission_classes = [IsAuthenticatedOrReadOnly]
#     #     return super(RepositoryViewSet, self).get_permissions()
#

class RepositoryViewSet(GenericViewSet,
                        CreateModelMixin,
                        RetrieveModelMixin,
                        UpdateModelMixin,
                        ListModelMixin,
                        DestroyModelMixin
                        ):
    """
          Creates, Updates and Retrieves - Repositories
       """



    authentication_classes = (TokenAuthentication,)
    queryset = Repository.objects.all()

    serializers = {
        'default': RepositorySerializer,
        'create': RepoSaveSerializer
    }

    def get_serializer_class(self):
        if self.action in ['create']:
            return RepoSaveSerializer
        return RepositorySerializer

    def get_permissions(self):
        print(self.request.data)
        # allow full access to authenticated users, but allow read-only access to unauthenticated users
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super(RepositoryViewSet, self).get_permissions()



    @action(detail=True, methods=['get'], url_path='user', url_name='user')
    def repos_for_user(self, request, pk):
        '''
            Returns repos for the specific user
        '''

        return Response(RepositorySerializer(Repository.objects.filter(owner__id=pk), many=True).data)


class ProjectViewSet(GenericViewSet,
                     CreateModelMixin,
                     RetrieveModelMixin,
                     UpdateModelMixin,
                     ListModelMixin,
                     DestroyModelMixin
                     ):
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    authentication_classes = (TokenAuthentication,)

    def get_permissions(self):
        print(self.request.data)
        # allow full access to authenticated users, but allow read-only access to unauthenticated users
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super(ProjectViewSet, self).get_permissions()

    @action(detail=True, methods=['get'], url_path='repo', url_name='repo')
    def projects_for_repo(self, request, pk):
        '''
            Returns project for the specific repo
        '''

        return Response(ProjectSerializer(Project.objects.filter(repository__id=pk), many=True).data)


class UserViewSet(GenericViewSet,
                  CreateModelMixin,
                  RetrieveModelMixin,
                  UpdateModelMixin,
                  ListModelMixin,
                  DestroyModelMixin
                  ):
    serializer_class = UserSerializer
    queryset = User.objects.all()


class PageViewSet(GenericViewSet,
                  CreateModelMixin,
                  RetrieveModelMixin,
                  UpdateModelMixin,
                  ListModelMixin,
                  DestroyModelMixin
                  ):
    serializer_class = PageSerializer
    queryset = Page.objects.all()

    @action(detail=True, methods=['get'], url_path='repository', url_name='repository')
    def page_by_repository(self, request, pk):
        return Response(PageSerializer(Page.objects.filter(repository__id=pk), many=True).data)


class FileViewSet(GenericViewSet,
                  CreateModelMixin,
                  RetrieveModelMixin,
                  UpdateModelMixin,
                  ListModelMixin,
                  DestroyModelMixin
                  ):
    serializer_class = FileSerializer
    queryset = File.objects.all()

    @action(detail=True, methods=['get'], url_path='task', url_name='task')
    def files_by_task(self, request, pk):
        return Response(FileSerializer(File.objects.filter(task__id=pk), many=True).data)

    @action(detail=True, methods=['get'], url_path='task', url_name='task')
    def files_by_page(self, request, pk):
        return Response(FileSerializer(File.objects.filter(page__id=pk), many=True).data)


class TaskViewSet(GenericViewSet,
                  CreateModelMixin,
                  RetrieveModelMixin,
                  UpdateModelMixin,
                  ListModelMixin,
                  DestroyModelMixin
                  ):
    serializers = {
        'default': TaskSerializer,
        'create': TaskSaveSerializer
    }
    queryset = Task.objects.all()

    def get_permissions(self):
        print(self.request.body)
        # allow full access to authenticated users, but allow read-only access to unauthenticated users
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super(TaskViewSet, self).get_permissions()

    def get_serializer_class(self):
        if self.action in ['update']:
            return TaskSaveSerializer
        return TaskSerializer

    @action(detail=True, methods=['get'], url_path='repository', url_name='repository')
    def tasks_by_repository(self, request, pk):
        return Response(TaskSerializer(Task.objects.filter(repository__id=pk), many=True).data)

    @action(detail=True, methods=['get'], url_path='milestone', url_name='milestone')
    def tasks_by_milestone(self, request, pk):
        return Response(TaskSerializer(Task.objects.filter(milestone__id=pk), many=True).data)

    @action(detail=False, methods=['get'], url_path='status-open', url_name='status-open')
    def tasks_by_status_opened(self, request):
        return Response(TaskSerializer(Task.objects.filter(status=Status.OPEN), many=True).data)

    @action(detail=False, methods=['get'], url_path='status-closed', url_name='status-closed')
    def tasks_by_status_closed(self, request):
        return Response(TaskSerializer(Task.objects.filter(status=Status.CLOSED), many=True).data)

    @action(detail=False, methods=['get'], url_path='status-expired', url_name='status-expired')
    def tasks_by_status_expired(self, request):
        return Response(TaskSerializer(Task.objects.filter(status=Status.EXPIRED), many=True).data)

    @action(detail=True, methods=['get'], url_path='column', url_name='column')
    def tasks_by_column(self, request, pk):
        return Response(TaskSerializer(Task.objects.filter(column__id=pk), many=True).data)


class ColumnViewSet(GenericViewSet,
                    CreateModelMixin,
                    RetrieveModelMixin,
                    UpdateModelMixin,
                    ListModelMixin,
                    DestroyModelMixin
                    ):
    serializer_class = ColumnSerializer
    queryset = Column.objects.all()

    serializers = {
        'default': ColumnSerializer,
        'create': ColumnSaveSerializer
    }

    def get_serializer_class(self):
        if self.action in ['create']:
            return ColumnSaveSerializer
        return ColumnSerializer



    def get_permissions(self):
        print(self.request.data)
        # allow full access to authenticated users, but allow read-only access to unauthenticated users
        self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super(ColumnViewSet, self).get_permissions()

    @action(detail=True, methods=['get'], url_path='project', url_name='project')
    def columns_by_project(self, request, pk):
        return Response(ColumnSerializer(Column.objects.filter(project__id=pk), many=True).data)
