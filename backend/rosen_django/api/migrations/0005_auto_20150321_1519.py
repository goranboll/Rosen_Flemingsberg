# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_speciallocation'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='speciallocation',
            name='locationname',
        ),
        migrations.AddField(
            model_name='speciallocation',
            name='tiletype',
            field=models.ForeignKey(default=1, to='api.TileType'),
            preserve_default=True,
        ),
    ]
