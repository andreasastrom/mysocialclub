# -*- coding: utf-8 -*-
from django.db import models

# Create your models here.
class Greeting(models.Model):
	when = models.DateTimeField('date created', auto_now_add=True)
	
class Item(models.Model):
	name = models.CharField(max_length=100)
	createdtime = models.DateTimeField('date created', auto_now_add=True)
	done = models.IntegerField(default=0)
	endtime = models.DateTimeField('date deleted', auto_now_add=False, null=True)
	order = models.IntegerField(default=0)

class Countdown(models.Model):
	title = models.CharField(max_length=100)
	createdtime = models.DateTimeField('date created', auto_now_add=True)
	starttime =  models.DateTimeField('date deleted', auto_now_add=False, null=True)
	done = models.IntegerField(default=0)
	style = models.CharField(max_length=64)