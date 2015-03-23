# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20150321_1857'),
    ]

    operations = [
        migrations.AlterField(
            model_name='gang',
            name='color',
            field=models.ForeignKey(default=1, to='api.Color', null=True),
            preserve_default=True,
        ),
    ]
