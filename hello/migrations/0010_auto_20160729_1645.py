# -*- coding: utf-8 -*-
# Generated by Django 1.9.2 on 2016-07-29 14:45
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('hello', '0009_item_order'),
    ]

    operations = [
        migrations.RenameField(
            model_name='item',
            old_name='order',
            new_name='ordernumber',
        ),
    ]
