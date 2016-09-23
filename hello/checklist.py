from .models import Checklist
from django.core import serializers

def get_all_active_checkLists():
	all_checklists = Checklist.objects.filter(removed=0)
	all_checklists_serialized = serializers.serialize('json', all_checklists)	
	return all_checklists_serialized

def create_checklist(name):
	c = Checklist(name=name)
	c.save()

def remove(id): 
	c = Checklist.objects.filter(id=id)
	c.update(removed = 1)	
