from django.http import HttpResponse
from .models import Repository
from rest_framework import viewsets
from .serializers import RepoSerializer


class RepoView(viewsets.ModelViewSet):
    serializer_class = RepoSerializer
    queryset = Repository.objects.all()
