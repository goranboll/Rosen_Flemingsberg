# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import django.utils.timezone
import django.core.validators


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0001_initial'),
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='SpecialLocation',
            fields=[
                ('id', models.AutoField(verbose_name='ID', serialize=False, auto_created=True, primary_key=True)),
                ('x', models.IntegerField()),
                ('y', models.IntegerField()),
                ('locationname', models.CharField(max_length=30)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.CreateModel(
            name='TileType',
            fields=[
                ('name', models.CharField(max_length=30)),
                ('id', models.IntegerField(serialize=False, primary_key=True)),
            ],
            options={
            },
            bases=(models.Model,),
        ),
        migrations.AlterModelOptions(
            name='gang',
            options={'verbose_name': 'user', 'verbose_name_plural': 'users'},
        ),
        migrations.AddField(
            model_name='gang',
            name='date_joined',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='email',
            field=models.EmailField(max_length=75, verbose_name='email address', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='first_name',
            field=models.CharField(max_length=30, verbose_name='first name', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='groups',
            field=models.ManyToManyField(related_query_name='user', related_name='user_set', to='auth.Group', blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of his/her group.', verbose_name='groups'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='is_active',
            field=models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='is_staff',
            field=models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='last_login',
            field=models.DateTimeField(default=django.utils.timezone.now, verbose_name='last login'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='last_name',
            field=models.CharField(max_length=30, verbose_name='last name', blank=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='mapid',
            field=models.ForeignKey(related_name='GangMap', default=None, to='api.Map', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='password',
            field=models.CharField(default='pass', max_length=128, verbose_name='password'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='gang',
            name='user_permissions',
            field=models.ManyToManyField(related_query_name='user', related_name='user_set', to='auth.Permission', blank=True, help_text='Specific permissions for this user.', verbose_name='user permissions'),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='gang',
            name='username',
            field=models.CharField(default='gang', max_length=30, validators=[django.core.validators.RegexValidator('^[\\w.@+-]+$', 'Enter a valid username.', 'invalid')], help_text='Required. 30 characters or fewer. Letters, digits and @/./+/-/_ only.', unique=True, verbose_name='username'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='tile',
            name='mapid',
            field=models.ForeignKey(related_name='TileMap', default=None, to='api.Map', null=True),
            preserve_default=True,
        ),
        migrations.AddField(
            model_name='tile',
            name='tiletype',
            field=models.ForeignKey(default=1, to='api.TileType'),
            preserve_default=True,
        ),
        migrations.AlterField(
            model_name='gang',
            name='color',
            field=models.IntegerField(),
            preserve_default=True,
        ),
    ]
