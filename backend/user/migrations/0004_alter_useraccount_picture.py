# Generated by Django 5.0.1 on 2024-01-11 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_useraccount_picture'),
    ]

    operations = [
        migrations.AlterField(
            model_name='useraccount',
            name='picture',
            field=models.ImageField(blank=True, default='media/users/pictures/user_default.jpg', null=True, upload_to='media/users/pictures/', verbose_name='Picture'),
        ),
    ]