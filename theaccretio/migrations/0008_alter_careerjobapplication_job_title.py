# Generated by Django 4.2.6 on 2023-11-23 08:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('theaccretio', '0007_careerjobapplication_job_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='careerjobapplication',
            name='job_title',
            field=models.CharField(max_length=255),
        ),
    ]