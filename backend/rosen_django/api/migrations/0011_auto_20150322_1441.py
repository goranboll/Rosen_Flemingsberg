# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_auto_20150321_2052'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='itemtype',
            field=models.ForeignKey(to='api.ItemType', null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='tile',
            name='mapid',
            field=models.ForeignKey(related_name='tiles', to='api.Map', null=True),
            preserve_default=True,
        ),
    ]
