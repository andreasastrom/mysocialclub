# -*- coding: utf-8 -*-
from .models import Item
from django.utils import timezone
from django.db.models import Q
from django.core import serializers


def create_item(name):	
	i = Item(name=name)	
	i.save()

def get_all_items():
	startdate = timezone.now() - timezone.timedelta(hours=1)
	enddate = timezone.now()
	all_items = Item.objects.filter(Q(endtime__range=[startdate, enddate]) | Q(endtime=None))
	all_items_orderd = all_items.order_by('createdtime')
	all_items_serialized = serializers.serialize('json', all_items_orderd)
	return all_items_serialized

def update_item(id, value):
		
	if value == "1":
		endt =  timezone.now()
	else:
		endt = None

	print endt
	item = Item.objects.filter(id=id)
	item.update(done = value)
	item.update(endtime = endt)
	print "update item"

def remove_item(id):
	item = Item.objects.filter(id=id)
	item.delete()
	print "Remove item"