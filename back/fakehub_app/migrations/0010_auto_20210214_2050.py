# Generated by Django 3.1.5 on 2021-02-14 19:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fakehub_app', '0009_auto_20210214_2024'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commit',
            name='code',
            field=models.CharField(blank=True, default=7241266185693807912, max_length=64, unique=True),
        ),
    ]
