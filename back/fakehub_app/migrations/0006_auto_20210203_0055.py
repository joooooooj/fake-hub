# Generated by Django 3.1.5 on 2021-02-02 23:55

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('fakehub_app', '0005_auto_20210203_0051'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repository',
            name='date_created',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now),
        ),
    ]
