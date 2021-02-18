from rest_framework import serializers
from .models import User, Team, Repository, Project, Label, Milestone, Branch, Commit, Page, File, Task, Column


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']


class TeamSerializer(serializers.ModelSerializer):
    members = UserSerializer

    class Meta:
        model = Team
        fields = ['name', 'members', 'id', 'owner']
        depth = 1


class TeamSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['name', 'members', 'owner']


class RepositorySerializer(serializers.ModelSerializer):
    collaborators = UserSerializer
    team = TeamSerializer
    owner = UserSerializer

    class Meta:
        model = Repository
        fields = ['id', 'name', 'date_created', 'collaborators', 'team', 'owner', 'description']
        depth = 1


class RepoSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ['id', 'name', 'date_created', 'collaborators', 'team', 'owner', 'description']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'description', 'repository', 'status', 'id')


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ('name', 'description', 'color', 'repository')


class MilestoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = ('title', 'dueDate', 'description', 'status', 'labels', 'repository')


class BranchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Branch
        fields = ('name', 'author', 'repository', 'status')
        depth = 1


class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = ('description', 'code', 'committed_at', 'tag', 'branch', 'author')
        depth = 1


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('id', 'title', 'content', 'repository')


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('name', 'task', 'page')


class TaskSerializer(serializers.ModelSerializer):
    members = UserSerializer
    repository = RepositorySerializer
    labels = LabelSerializer
    milestone = MilestoneSerializer

    class Meta:
        model = Task
        fields = ('title', 'created_at', 'description', 'status', 'difficulty', 'closed_at',
                  'due_date', 'changes', 'milestone', 'labels', 'members', 'repository', 'column', 'id')
        depth = 1


class TaskSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('column', 'id')


class ColumnSerializer(serializers.ModelSerializer):
    project = ProjectSerializer

    class Meta:
        model = Column
        fields = ('name', 'project', 'id')
        depth = 1


class ColumnSaveSerializer(serializers.ModelSerializer):
    project = ProjectSerializer

    class Meta:
        model = Column
        fields = ('name', 'project', 'id')
