# Generated by Django 3.1.5 on 2021-02-14 20:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fakehub_app', '0009_auto_20210214_2024'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='content',
            field=models.FileField(default=None, upload_to=''),
        ),
        migrations.AlterField(
            model_name='commit',
            name='code',
            field=models.CharField(blank=True, default=5502573157665188940, max_length=64, unique=True),
        ),
    ]
