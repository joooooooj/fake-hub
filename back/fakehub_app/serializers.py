from rest_framework import serializers
from .models import User, Team, Repository, Project, Label, Milestone, Branch, Commit, Wiki, Page, File


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'email', 'first_name', 'last_name']


class TeamSerializer(serializers.ModelSerializer):
    members = UserSerializer

    class Meta:
        model = Team
        fields = ['name', 'members', 'id']
        depth = 1


class RepositorySerializer(serializers.ModelSerializer):
    collaborators = UserSerializer
    team = TeamSerializer
    owner = UserSerializer

    class Meta:
        model = Repository
        fields = ['id', 'name', 'date_created', 'collaborators', 'team', 'owner']
        depth = 1


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'description', 'repository')


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


class CommitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Commit
        fields = ('description', 'code', 'committed_at', 'tag', 'branch', 'author')


class WikiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Wiki
        fields = 'repository'


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = ('title', 'content', 'wiki')


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('name', 'content', 'task', 'page')
