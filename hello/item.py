# -*- coding: utf-8 -*-
from .models import Item
from django.utils import timezone
from django.db.models import Q
from django.core import serializers
import json

def create_item(name, checklist):
	newItem = Item(name=name, checklist_id=checklist)
	newItem.save()
	mapped_item = item_mapper(newItem)
	return json.dumps(mapped_item)

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
	all_items_orderd = all_items_orderd.order_by('done')
	mappedItemList = []
	for item in all_items_orderd:
		mappedItem = item_mapper(item)
		mappedItemList.append(mappedItem)
	all_items_json = json.dumps(mappedItemList)
	#all_items_serialized = serializers.serialize('json', all_items_orderd)
	return all_items_json

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
	item = Item.objects.filter(id=id)
	item.update(ordernumber=newvalue)

def reorder_items(i):
	startdate = timezone.now() - timezone.timedelta(hours=1)
	enddate = timezone.now()
	for item in items:
		item.update(ordernumber = F('ordernumber') + 1)

def item_mapper(rawItem):
	item = {}
	item['id'] = rawItem.id
	item['name'] = rawItem.name
	item['done'] = rawItem.done
	return item