from enum import Enum

from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


# Repository data

class Team(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User)

    def __str__(self):
        return self.name


class Repository(models.Model):
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now)
    owner = models.ManyToManyField(User)
    team = models.ForeignKey(Team, on_delete=models.CASCADE, default=None, blank=True, null=True)

    def __str__(self):
        string = ' name:' + str(self.name) + ' author:' + str(self.owner) + ' '
        return string


class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(default=None, blank=True, null=True)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


# Version control

class Branch(models.Model):
    name = models.CharField(max_length=100)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, default=None, blank=True, null=True)
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE, default=None, blank=True, null=True)

    def __str__(self):
        return self.name


class Commit(models.Model):
    description = models.TextField
    code = models.CharField  # hash code of the commit
    commited_at = models.DateTimeField(default=timezone.now)
    tag = models.CharField(max_length=100, default=None, blank=True, null=True)
    # git leaves dangling commits which later get deleted by garbage collection
    branch = models.ForeignKey(Branch, on_delete=models.SET_NULL, default=None, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, default=None, blank=True, null=True)

    def __str__(self):
        return self.code + ' ' + str(self.description)


# Wiki

class Wiki(models.Model):
    repository = models.ForeignKey(Repository, on_delete=models.CASCADE)


class Page(models.Model):
    wiki = models.ForeignKey(Wiki, on_delete=models.CASCADE)


# Planning

class Label(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(default=None, blank=True, null=True)
    color = models.CharField(max_length=7)  # hex code


class Status(models.TextChoices):
    OPEN = 'Open'
    CLOSED = 'Closed'
    EXPIRED = 'Expired'


class Milestone(models.Model):
    title = models.CharField(max_length=100)
    dueDate = models.DateTimeField(default=None, blank=True, null=True)
    description = models.TextField(default=None, blank=True, null=True)
    status = models.CharField(choices=Status.choices, default=Status.OPEN, max_length=100)
    labels = models.ManyToManyField(Label)


class Task(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(default=timezone.now)
    description = models.TextField(default=None, blank=True, null=True)
    status = models.CharField(choices=Status.choices, default=Status.OPEN, max_length=100)
    difficulty = models.IntegerField(validators=[
        MaxValueValidator(1),
        MinValueValidator(10)
    ], default=None, blank=True, null=True)
    closed_at = models.DateTimeField(default=None, blank=True, null=True)
    due_date = models.DateTimeField(default=None, blank=True, null=True)
    changes = models.TextField(default=None, blank=True, null=True)  # I dont remember what this was
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE, default=None, blank=True, null=True)
    labels = models.ManyToManyField(Label)
    members = models.ManyToManyField(User)


class Column(models.Model):
    name = models.CharField
    task = models.ForeignKey(Task, on_delete=models.CASCADE, default=None, blank=True, null=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, default=None, blank=True, null=True)


class File(models.Model):
    name = models.CharField
    content = models.TextField
    task = models.ForeignKey(Task, on_delete=models.CASCADE, default=None, blank=True, null=True)
    page = models.ForeignKey(Page, on_delete=models.CASCADE, default=None, blank=True, null=True)
