# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2017-09-02 03:13
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0019_auto_20170902_0313'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='checklist',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='hello.Checklist'),
        ),
    ]
