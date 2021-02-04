from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

admin.site.register(User, UserAdmin)


@admin.register(Label)
class LabelAdmin(admin.ModelAdmin):
    search_fields = ('id', 'repository')
    list_display = ('name', 'color', 'repository', 'id')


@admin.register(Milestone)
class MilestoneAdmin(admin.ModelAdmin):
    search_fields = ('id', 'repository')
    list_display = ('title', 'repository', 'id')
