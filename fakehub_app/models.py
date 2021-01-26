from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Team(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Repository(models.Model):
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None, blank=True, null=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, default=None, blank=True, null=True)

    def __str__(self):
        string = ' name:' + str(self.name) + ' author:' + str(self.owner) + ' '
        return string


class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)

    def __str__(self):
        return self.name
