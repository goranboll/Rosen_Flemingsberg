# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_remove_item_mapvariant'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='homie',
            name='banana',
        ),
        migrations.AddField(
            model_name='homie',
            name='endurance',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
