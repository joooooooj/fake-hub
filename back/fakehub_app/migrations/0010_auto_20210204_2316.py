# Generated by Django 3.1.5 on 2021-02-04 22:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fakehub_app', '0009_auto_20210204_2247'),
    ]

    operations = [
        migrations.AlterField(
            model_name='milestone',
            name='labels',
            field=models.ManyToManyField(blank=True, default=None, to='fakehub_app.Label'),
        ),
    ]