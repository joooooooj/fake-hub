from django.contrib import admin

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


@admin.register(Wiki)
class WikiAdmin(admin.ModelAdmin):
    search_fields = ('id', 'repository')
    list_display = ('repository', 'id')


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    search_fields = ('id', 'title', 'content', 'wiki')
    list_display = ('id', 'title', 'content', 'wiki')


@admin.register(File)
class FileAdmin(admin.ModelAdmin):
    search_fields = ('id', 'name', 'task', 'page')
    list_display = ('id', 'name', 'task', 'page')


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    search_fields = ('id', 'title', 'created_at', 'description', 'status', 'difficulty', 'closed_at',
                     'due_date', 'changes', 'milestone', 'labels', 'members', 'repository')


@admin.register(Column)
class ColumnAdmin(admin.ModelAdmin):
    search_fields = ('id', 'name', 'project')


@admin.register(Team)
class ColumnAdmin(admin.ModelAdmin):
    search_fields = ('id', 'name')
    list_display = ('id', 'name')