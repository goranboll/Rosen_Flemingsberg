# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20150322_1504'),
    ]

    operations = [
        migrations.AlterField(
            model_name='item',
            name='itemtype',
            field=models.CharField(max_length=20),
            preserve_default=True,
        ),
        migrations.DeleteModel(
            name='ItemType',
        ),
    ]
