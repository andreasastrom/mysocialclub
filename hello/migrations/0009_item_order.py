# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-07-26 13:33
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0008_countdown_style'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='order',
            field=models.IntegerField(default=0),
        ),
    ]
