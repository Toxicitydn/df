# Generated by Django 3.2 on 2021-12-30 09:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='todo',
            name='batch',
            field=models.IntegerField(choices=[(2016, 2016), (2017, 2017), (2018, 2018), (2019, 2019), (2020, 2020), (2021, 2021)], default=2020),
        ),
        migrations.AddField(
            model_name='todo',
            name='course_id',
            field=models.CharField(default='', max_length=10),
        ),
        migrations.AddField(
            model_name='todo',
            name='course_instructor',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AddField(
            model_name='todo',
            name='feedback',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='todo',
            name='name',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='todo',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AlterField(
            model_name='todo',
            name='title',
            field=models.CharField(default='', max_length=120),
        ),
    ]
