# -*- coding: utf-8 -*-
from .models import Item
from django.utils import timezone
from django.db.models import Q, F
from django.core import serializers


def create_item(name):	
	order = get_highest_soring_order() + 1
	i = Item(name=name, ordernumber=order)		
	i.save()

def get_all_items():
	startdate = timezone.now() - timezone.timedelta(hours=1)
	enddate = timezone.now()
	all_items = Item.objects.filter(Q(endtime__range=[startdate, enddate]) | Q(endtime=None))
	all_items_orderd = all_items.order_by('ordernumber')
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
	#item.update(orderNr = 1)	
	print "update item"

def remove_item(id):
	item = Item.objects.filter(id=id)
	item.delete()
	print "Remove item"

def get_highest_soring_order(): 
	startdate = timezone.now() - timezone.timedelta(hours=1)
	enddate = timezone.now()
	all_items = Item.objects.filter(Q(endtime__range=[startdate, enddate]) | Q(endtime=None))
	index = all_items.order_by("-ordernumber")[0]	
	return index.ordernumber


def update_item_order(newvalue, id):
	reorder_items(newvalue)	
	print newvalue	
	print id
	item = Item.objects.filter(id=id)	
	item.update(ordernumber=newvalue)
	


def reorder_items(i):	
	startdate = timezone.now() - timezone.timedelta(hours=1)
	enddate = timezone.now()
	print "_____________"
	print i 
	print " ----------------"
	print Item.objects.filter(ordernumber__gte=i).count()
	Item.objects.filter((Q(endtime__range=[startdate, enddate]) | Q(endtime=None)) & Q(ordernumber__gt=i)).update(ordernumber=F('ordernumber') + 1)


	# for item in all_items: 
	# 	print item.name
	# 	i = i + 1
	# 	item(order=i)	
	# 	item.save()	
		

	#print all_items.count()