from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


class Repository(models.Model):
    name = models.CharField(max_length=100)
    date_created = models.DateTimeField(default=timezone.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        string = ' name:' + str(self.name) + ' author:' + str(self.author) + ' '
        return string
