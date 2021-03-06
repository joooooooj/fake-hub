# Generated by Django 3.1.5 on 2021-02-20 06:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('fakehub_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='email',
            field=models.EmailField(blank=True, max_length=254, verbose_name='email address'),
        ),
        migrations.AlterField(
            model_name='user',
            name='last_name',
            field=models.CharField(blank=True, max_length=150, verbose_name='last name'),
        ),
    ]
