from django.contrib import admin
from .models import *


class RepoAdmin(admin.ModelAdmin):
    list_display = ('name', 'owner', 'date_created')


class TeamAdmin(admin.ModelAdmin):
    list_display = ['name']


class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'repository')


admin.site.register(Repository, RepoAdmin)
admin.site.register(Team, TeamAdmin)
admin.site.register(Project, ProjectAdmin)
