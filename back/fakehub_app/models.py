import random

from django.contrib.auth.models import AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone


# Repository data

class User(AbstractUser):
    name = models.CharField(max_length=100)
    password = models.CharField(max_length=100)


class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User,default=None, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,related_name='team_owner')

    def __str__(self):
        return self.name


class Repository(models.Model):
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now, blank=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='repo_owner', null=True, blank=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, default=None, blank=True, null=True)
    collaborators = models.ManyToManyField(User,blank=True)
    description = models.TextField(default=None, blank=True, null=True)

    def __str__(self):
        string = ' name:' + str(self.name) + ' '
        return string


class ProjectStatus(models.TextChoices):
    OPEN = 'Open'
    CLOSED = 'Closed'


class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(default=None, blank=True, null=True)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    status = models.CharField(choices=ProjectStatus.choices, default=ProjectStatus.OPEN, max_length=100)

    def __str__(self):
        return self.name


# Version control


class BranchPullStatus(models.TextChoices):
    OPEN = 'Open'
    CLOSED = 'Closed'
    CHANGED = 'Changed'


class Branch(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, default=None, blank=True, null=True)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    status = models.CharField(choices=BranchPullStatus.choices, default=BranchPullStatus.OPEN, max_length=100)

    def __str__(self):
        return self.name


def hash_code():
    return random.getrandbits(64)


class Commit(models.Model):
    description = models.TextField(default=None, blank=True, null=True)
    code = models.CharField(max_length=64, unique=True, blank=True)  # hash code of the commit
    committed_at = models.DateTimeField(default=timezone.now)
    tag = models.CharField(max_length=100, default=None, blank=True, null=True)
    # git leaves dangling commits which later get deleted by garbage collection
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, default=None, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, default=None, blank=True, null=True)

    def __str__(self):
        return str(self.code) + ' ' + str(self.description)


class Page(models.Model):
    title = models.CharField(default="New page", max_length=100)
    content = models.TextField(default="My new awesome page")
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)


# Planning

class Label(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(default=None, blank=True, null=True)
    color = models.CharField(max_length=7)  # hex code
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE, default=None, blank=True, null=True)


class Status(models.TextChoices):
    OPEN = 'Open'
    CLOSED = 'Closed'
    EXPIRED = 'Expired'


class Milestone(models.Model):
    title = models.CharField(max_length=100)
    dueDate = models.DateTimeField(default=None, blank=True, null=True)
    description = models.TextField(default=None, blank=True, null=True)
    status = models.CharField(choices=Status.choices, default=Status.OPEN, max_length=100)
    labels = models.ManyToManyField(Label, default=None, blank=True)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)


class Column(models.Model):
    name = models.CharField(max_length=100)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, default=None, blank=True, null=True)

    def __str__(self):
        return str(self.name)


class Task(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)
    description = models.TextField(default=None, blank=True, null=True)
    status = models.CharField(choices=Status.choices, default=Status.OPEN, max_length=100)
    difficulty = models.IntegerField(validators=[
        MaxValueValidator(10),
        MinValueValidator(1)
    ], default=None, blank=True, null=True)
    closed_at = models.DateTimeField(default=None, blank=True, null=True)
    due_date = models.DateTimeField(default=None, blank=True, null=True)
    changes = models.TextField(default=None, blank=True, null=True)  # I dont remember what this was
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE, default=None, blank=True, null=True)
    labels = models.ManyToManyField(Label, default=None, blank=True)
    members = models.ManyToManyField(User, default=None, blank=True, related_name='task_members')
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)
    column = models.ForeignKey(Column, on_delete=models.CASCADE, default=None, blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None, blank=False, null=False, related_name='task_owner')

    def __str__(self):
        return str(self.title)


class File(models.Model):
    name = models.FileField(default=None)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, default=None, blank=True, null=True)
    page = models.ForeignKey(Page, on_delete=models.CASCADE, default=None, blank=True, null=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=None, blank=True, null=True)
