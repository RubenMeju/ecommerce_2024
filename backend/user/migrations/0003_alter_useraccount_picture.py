# Generated by Django 5.0.1 on 2024-01-11 19:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_alter_useraccount_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='picture',
            field=models.ImageField(blank=True, default='media/users.jpg', null=True, upload_to='media/users/pictures/', verbose_name='Picture'),
        ),
    ]
