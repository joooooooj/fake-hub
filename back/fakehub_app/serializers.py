from rest_framework import serializers
from .models import User, Team, Repository, Project, Label, Milestone, Branch, Commit, Page, File, Task, Column


class UserSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user

    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']


class UserChangePasswordSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        password = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)
        instance.save()

        return instance

    class Meta:
        model = User
        fields = ['password']


class UserUpdateSerializer(serializers.ModelSerializer):
    def update(self, instance, validated_data):
        for (key, value) in validated_data.items():
            setattr(instance, key, value)
        instance.save()

        return instance

    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']


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
        fields = ('id', 'name', 'description', 'color', 'repository')


class MilestoneSerializer(serializers.ModelSerializer):
    labels = LabelSerializer

    class Meta:
        model = Milestone
        fields = ('id', 'title', 'dueDate', 'description', 'status', 'labels')
        depth = 1


class MilestoneSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Milestone
        fields = ('id', 'title', 'dueDate', 'description', 'status', 'labels', 'repository')


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
        fields = ('name', 'task', 'page', 'user')


class TaskSerializer(serializers.ModelSerializer):
    members = UserSerializer
    repository = RepositorySerializer
    labels = LabelSerializer
    milestone = MilestoneSerializer

    class Meta:
        model = Task
        fields = ('title', 'created_at', 'description', 'status', 'difficulty', 'closed_at',
                  'due_date', 'changes', 'milestone', 'labels', 'members', 'repository', 'column', 'id', 'owner')
        depth = 1


class TaskSaveSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('column', 'id')


class TaskMainSaveSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()

    class Meta:
        model = Task
        fields = ('title', 'created_at', 'description', 'status', 'difficulty', 'closed_at',
                  'due_date', 'changes', 'milestone', 'labels', 'members', 'repository', 'column', 'id', 'owner')


class TaskCloseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('status', 'closed_at', 'changes')


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
