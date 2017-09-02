from .models import Checklist
from django.contrib.auth.models import User
from django.core import serializers

def get_all_active_checkLists():
	all_checklists = Checklist.objects.filter(removed=0)
	all_checklists_serialized = serializers.serialize('json', all_checklists)	
	return all_checklists_serialized

def create_checklist(name,user_id):
	user = User.objects.get(id=user_id)
	c = Checklist(name=name,created_user=user)
	c.save()

def remove(id): 
	c = Checklist.objects.filter(id=id)
	c.update(removed = 1)	

def update(id ,name):
	c = Checklist.objects.filter(id=id)
	c.update(name=name)	