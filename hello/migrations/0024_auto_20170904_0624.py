# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2017-09-04 06:24
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0023_auto_20170903_0120'),
    ]

    operations = [
        migrations.AddField(
            model_name='checklist',
            name='shared',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='item',
            name='checklist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hello.Checklist'),
        ),
    ]
