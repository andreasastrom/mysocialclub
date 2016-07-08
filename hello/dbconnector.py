from django.db import models
from .models import Person


def db_connector():
	print "fisk"
	per = Person()
	per.create("hadsasd")
	#person = Person().create("andreas")
	#print person
	#return "hej"
