# Generated by Django 3.1.5 on 2021-02-14 18:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [

    ]

    operations = [
        migrations.AlterField(
            model_name='commit',
            name='code',
            field=models.CharField(blank=True, default=8688767715097769613, max_length=64, unique=True),
        ),
    ]
