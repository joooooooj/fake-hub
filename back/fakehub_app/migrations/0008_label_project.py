# Generated by Django 3.1.5 on 2021-02-04 20:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('fakehub_app', '0007_auto_20210203_0101'),
    ]

    operations = [
        migrations.AddField(
            model_name='label',
            name='project',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='fakehub_app.project'),
            preserve_default=False,
        ),
    ]
