# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_item_energy'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='energy',
            field=models.IntegerField(default=100),
            preserve_default=True,
        ),
    ]
