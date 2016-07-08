# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse

from django.core import serializers
from .models import Greeting
import requests
from hello import item, activity
from django.views.decorators.csrf import csrf_exempt

# Create your views here.
def index(request):
    # return HttpResponse('Hello from Python!')
    return render(request, 'index.html')

	
def db(request):
    greeting = Greeting()
    greeting.save()
    greetings = Greeting.objects.all()
    return render(request, 'db.html', {'greetings': greetings})

##Used to create a item. 
@csrf_exempt
def create_item(request):
    name = request.POST.get("name", "")
    item.create_item(name)
    return render(request, 'index.html')

def get_all_items(request):
    i = item.get_all_items()
    return HttpResponse(i)

@csrf_exempt
def remove_item(request):
    id = request.POST.get("id", "")
    item.remove_item(id)
    return render(request, 'index.html')

@csrf_exempt
def update_item(request):
    id = request.POST.get("id", "")
    done = request.POST.get("done", 0)
    item.update_item(id, done)
    return render(request, 'index.html')

@csrf_exempt
def create_activity(request):
    title = request.POST.get("title", "")
    date = request.POST.get("date", "")
    style = request.POST.get("style","")
    activity.create_countdown_activity(title, date, style)
    return render(request, 'index.html')

def get_all_activities(request):
    all_activities = activity.get_countdown_activity()
    return HttpResponse(all_activities)

@csrf_exempt
def remove_acticity(request):
    id = request.POST.get("id", "")
    print id
    activity.remove_acticity(id)
    return render(request, 'index.html')


def get_weather(request):
    weather = requests.get('http://api.openweathermap.org/data/2.5/weather?q=Taormina&units=metric&appid=05cded3be7ec61a14bd04f1a39eb18a5')
    return HttpResponse(weather)