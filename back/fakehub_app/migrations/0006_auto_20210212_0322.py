# Generated by Django 3.1.5 on 2021-02-12 02:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fakehub_app', '0005_auto_20210212_0318'),
    ]

    operations = [
        migrations.AlterField(
            model_name='commit',
            name='code',
            field=models.CharField(blank=True, default=7132924268355730928, max_length=64, unique=True),
        ),
    ]