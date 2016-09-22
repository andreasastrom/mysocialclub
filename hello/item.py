# -*- coding: utf-8 -*-
from .models import Item
from django.utils import timezone
from django.db.models import Q
from django.core import serializers


def create_item(name, checklist):	
	i = Item(name=name, checklist_id=checklist)	
	i.save()

def get_all_items():
	startdate = timezone.now() - timezone.timedelta(hours=1)
	enddate = timezone.now()
	all_items = Item.objects.filter(Q(endtime__range=[startdate, enddate]) | Q(endtime=None))
	all_items_orderd = all_items.order_by('createdtime')
	all_items_serialized = serializers.serialize('json', all_items_orderd)
	return all_items_serialized

def get_all_items_by_checklist_id(checklist_id):
	startdate = timezone.now() - timezone.timedelta(hours=1)
	enddate = timezone.now()		
	all_items = Item.objects.filter(Q(
			Q(checklist_id=float(checklist_id)) 
			& Q(
				Q(endtime__range=[startdate, enddate]) | Q(endtime=None))
			)
	)
	all_items_orderd = all_items.order_by('createdtime')
	all_items_serialized = serializers.serialize('json', all_items_orderd)
	return all_items_serialized

def update_item(id, value):
		
	if value == "1":
		endt =  timezone.now()
	else:
		endt = None
	item = Item.objects.filter(id=id)
	item.update(done = value)
	item.update(endtime = endt)	

def remove_item(id):
	item = Item.objects.filter(id=id)
	item.delete()

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
	# count = Item.objects.filter(ordernumber__gte=i).count()
	# print count + i
	#Item.objects.filter((Q(endtime__range=[startdate, enddate]) | Q(endtime=None)) & Q(ordernumber__gt=i)).update(ordernumber=F('ordernumber') + 1)
	# items = Item.objects.filter((Q(endtime__range=[startdate, enddate]) | Q(endtime=None)) & Q(ordernumber__gt=i))
	for item in items:
		item.update(ordernumber = F('ordernumber') + 1)

	print "Hje"


	# for item in all_items: 
	# 	print item.name
	# 	i = i + 1
	# 	item(order=i)	
	# 	item.save()	
		

	#print all_items.count()
