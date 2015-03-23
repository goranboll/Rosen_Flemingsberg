# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_auto_20150321_2011'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gang',
            name='mapid',
            field=models.ForeignKey(related_name='GangMap', to='api.Map', null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='tile',
            name='mapid',
            field=models.ForeignKey(related_name='TileMap', to='api.Map', null=True),
            preserve_default=True,
        ),
    ]
