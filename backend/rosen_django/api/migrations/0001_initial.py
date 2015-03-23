# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Gang',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=30)),
                ('color', models.IntegerField(max_length=10)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('name', models.CharField(max_length=50)),
                ('picture', models.CharField(max_length=100)),
                ('mapvariant', models.IntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Homie',
            fields=[
                ('item_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='api.Item')),
                ('banana', models.CharField(max_length=10)),
                ('strenght', models.IntegerField()),
            ],
            options={
            },
            bases=('api.item',),
        ),
        migrations.CreateModel(
            name='Car',
            fields=[
                ('item_ptr', models.OneToOneField(parent_link=True, auto_created=True, primary_key=True, serialize=False, to='api.Item')),
                ('passengers', models.ForeignKey(to='api.Homie')),
            ],
            options={
            },
            bases=('api.item',),
        ),
        migrations.CreateModel(
            name='Map',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='Tile',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
              
                ('x', models.IntegerField()),
                ('y', models.IntegerField()),
                ('picture', models.CharField(max_length=100)),
                ('gang_id', models.IntegerField()),
                ('mapvariant', models.IntegerField()),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AddField(
            model_name='item',
            name='gang',
            field=models.ForeignKey(to='api.Gang'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='item',
            name='tile',
            field=models.ForeignKey(to='api.Tile'),
            preserve_default=True,
        ),
    ]
