# Generated by Django 3.1.5 on 2021-02-17 12:11

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fakehub_app', '0020_auto_20210217_1210'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commit',
            name='code',
            field=models.CharField(blank=True, default=1498118795884051588, max_length=64, unique=True),
        ),
        migrations.AlterField(
            model_name='task',
            name='labels',
            field=models.ManyToManyField(blank=True, default=None, null=True, to='fakehub_app.Label'),
        ),
        migrations.AlterField(
            model_name='task',
            name='members',
            field=models.ManyToManyField(blank=True, default=None, null=True, to=settings.AUTH_USER_MODEL),
        ),
    ]
