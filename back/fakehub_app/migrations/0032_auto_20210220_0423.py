# Generated by Django 3.1.5 on 2021-02-20 03:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fakehub_app', '0031_team_owner'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='lastname',
            field=models.CharField(default=1, max_length=100),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.CharField(max_length=100),
        ),
    ]
