from django.contrib import admin
from .models import Repository


class RepoAdmin(admin.ModelAdmin):  # add this
    list_display = ('name', 'author', 'date_created')

admin.site.register(Repository, RepoAdmin)
