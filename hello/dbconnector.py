from django.db import models
from .models import Person


def db_connector():	
	per = Person()
	per.create("hadsasd")	
