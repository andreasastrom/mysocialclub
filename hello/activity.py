# -*- coding: utf-8 -*-
from .models import Countdown
from django.utils import timezone
from django.db.models import Q
from django.core import serializers


def create_countdown_activity(title, date, style):
	c = Countdown(title=title,starttime=date,style=style)
	c.save()

def get_countdown_activity():
	startdate = timezone.now() - timezone.timedelta(hours=1)
	enddate = timezone.now()
	all_acivities = Countdown.objects.filter(starttime__gt=enddate)
	all_acivities_orderd = all_acivities.order_by('starttime')
	all_acivities_serialized = serializers.serialize('json', all_acivities_orderd)
	print "Klar"
	return all_acivities_serialized

def remove_acticity(id):
	activity = Countdown.objects.filter(id=id)
	activity.delete()
	print "Remove item"