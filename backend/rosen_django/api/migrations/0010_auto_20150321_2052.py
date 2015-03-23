# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_auto_20150321_2049'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gang',
            name='mapid',
            field=models.ForeignKey(related_name='gang', to='api.Map', null=True),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='tile',
            name='mapid',
            field=models.ForeignKey(related_name='tile', to='api.Map', null=True),
            preserve_default=True,
        ),
    ]
