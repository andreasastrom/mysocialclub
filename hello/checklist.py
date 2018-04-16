from .models import Checklist
from django.contrib.auth.models import User
from django.core import serializers
from django.db.models import Q
import json
from hello import item

def get_all_active_checkLists(user_id):
	all_checklists = Checklist.objects.filter(Q(created_user=user_id, removed=0) | Q(shared=1, removed=0))
	mappedList = []
	for checklist in all_checklists:
		checklistdata = checklist_mapper(checklist, user_id)
		mappedList.append(checklistdata)
	all_checklists_json = json.dumps(mappedList)
	return all_checklists_json

def create_checklist(name,user_id):
	user = User.objects.get(id=user_id)
	c = Checklist(name=name,created_user=user)
	c.save()

def remove(id):
	c = Checklist.objects.filter(id=id)
	c.update(removed = 1)

def update(id ,shared, name):
	c = Checklist.objects.filter(id=id)
	c.update(name=name, shared=shared)

def checklist_mapper(rawChecklist, user_id):
	checklist = {}
	checklist['id'] = rawChecklist.id
	checklist['name'] = rawChecklist.name
	checklist['shared'] = rawChecklist.shared
	checklist['removed'] = rawChecklist.removed
	checklist['editable'] = True if int(rawChecklist.created_user.id) == int(user_id) else False
	return checklist

def checklists(user_id):
	all_checklists = Checklist.objects.filter(Q(created_user=user_id, removed=0) | Q(shared=1, removed=0))
	if all_checklists is not None:
		mappedChecklistList = []
		for checklist in all_checklists:
			mapped_Checklist = checklist_mapper(checklist, user_id)
			checklist_id = checklist.id
			items = item.get_all_items_by_checklist_id(checklist_id)
			mapped_Checklist['items'] = items
			mappedChecklistList.append(mapped_Checklist)
		return json.dumps(mappedChecklistList)
	else:
		return False