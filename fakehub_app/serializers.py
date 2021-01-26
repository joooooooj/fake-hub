from rest_framework import serializers
from .models import *


class RepoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Repository
        fields = ('name', 'date_created', 'owner', 'team')


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = ['name']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ('name', 'description', 'repository')
