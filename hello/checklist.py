from .models import Checklist
from django.core import serializers

def get_all_active_checkLists():
	all_checklists = Checklist.objects.filter(removed=0)
	#all_checklists = Checklist.objects.all()
	print "roon"
	all_checklists_serialized = serializers.serialize('json', all_checklists)
	print "lol"
	return all_checklists_serialized