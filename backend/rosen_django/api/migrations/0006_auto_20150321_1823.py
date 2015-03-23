# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20150321_1519'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='tile',
            field=models.ForeignKey(related_name='items', to='api.Tile'),
            preserve_default=True,
        ),
    ]
