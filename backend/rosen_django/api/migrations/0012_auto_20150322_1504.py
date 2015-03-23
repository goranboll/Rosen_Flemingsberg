# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_auto_20150322_1441'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Car',
            new_name='Vehicle',
        ),
    ]
