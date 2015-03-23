# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20150322_1514'),
    ]

    operations = [
        migrations.AddField(
            model_name='item',
            name='energy',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
