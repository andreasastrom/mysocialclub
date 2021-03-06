# -*- coding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Greeting(models.Model):
	when = models.DateTimeField('date created', auto_now_add=True)

class Checklist(models.Model):
	name = models.CharField(max_length=100)
	removed = models.IntegerField(default=0)
	listtype = models.IntegerField(default=0)
	created_user = models.ForeignKey(User, on_delete=models.CASCADE)
	shared = models.IntegerField(default=0)

class Item(models.Model):
	name = models.CharField(max_length=100)
	createdtime = models.DateTimeField('date created', auto_now_add=True)
	done = models.IntegerField(default=0)
	endtime = models.DateTimeField('date deleted', auto_now_add=False, null=True)
	ordernumber = models.IntegerField(default=0)
	checklist = models.ForeignKey(Checklist, on_delete=models.CASCADE)

class Countdown(models.Model):
	title = models.CharField(max_length=100)
	createdtime = models.DateTimeField('date created', auto_now_add=True)
	starttime =  models.DateTimeField('date deleted', auto_now_add=False, null=True)
	done = models.IntegerField(default=0)
	style = models.CharField(max_length=64)

class Application(models.Model):
	name = models.CharField(max_length=100)
	createdtime = models.DateTimeField('date created', auto_now_add=True)
	deletedtime = models.DateTimeField('date deleted', auto_now_add=False, null=True)
	active = models.IntegerField(default=1)

class Recipe(models.Model):
	createdtime = models.DateTimeField('date created', auto_now_add=True)
	name = models.CharField(max_length=100)
	link = models.CharField(max_length=2048)
	deleted = models.IntegerField(default=0)
	created_user = models.ForeignKey(User, on_delete=models.CASCADE)
	vegetarian = models.IntegerField(default=0)
	favorite = models.BooleanField(default=False)