# Generated by Django 3.1.5 on 2021-02-02 23:51

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('fakehub_app', '0004_auto_20210203_0046'),
    ]

    operations = [
        migrations.AlterField(
            model_name='repository',
            name='date_created',
            field=models.DateTimeField(blank=True, default=django.utils.timezone.now, null=True),
        ),
    ]
