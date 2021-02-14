from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    search_fields = ('id', 'username')
    list_display = ('id', 'username')


@admin.register(Label)
class LabelAdmin(admin.ModelAdmin):
    search_fields = ('id', 'repository')
    list_display = ('name', 'color', 'repository', 'id')


@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    search_fields = ('id', 'repository')
    list_display = ('title', 'repository', 'id')


@admin.register(Branch)
class BranchAdmin(admin.ModelAdmin):
    search_fields = ('id', 'repository')
    list_display = ('name', 'repository', 'id')


@admin.register(Commit)
class BranchAdmin(admin.ModelAdmin):
    search_fields = ('id', 'code', 'author', 'description', 'branch', 'committed_at', 'tag')
    list_display = ('id', 'code', 'author', 'description', 'branch', 'committed_at', 'tag')


@admin.register(Repository)
class RepositoryAdmin(admin.ModelAdmin):
    search_fields = ('id', 'owner')
    list_display = ('owner', 'id')
