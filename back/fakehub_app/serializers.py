from rest_framework import serializers
from .models import Repository


class RepoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Repository
    fields = ('name', 'date_created', 'author')