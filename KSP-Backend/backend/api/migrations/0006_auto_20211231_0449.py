# Generated by Django 3.2 on 2021-12-30 23:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_notes_previousyearquestions'),
    ]

    operations = [
        migrations.AddField(
            model_name='notes',
            name='num_vote_down',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='notes',
            name='num_vote_up',
            field=models.PositiveIntegerField(db_index=True, default=0),
        ),
        migrations.AddField(
            model_name='notes',
            name='vote_score',
            field=models.IntegerField(db_index=True, default=0),
        ),
    ]
