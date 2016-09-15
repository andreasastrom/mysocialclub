# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

from django.core import serializers
from .models import Greeting
import requests
from hello import item, activity, userModel, checklist
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User


# Create your views here.
def index(request):
    #userModel.create_user()
    #checklist.getAllActiveCheckLists()
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

def get_all_items_by_checklist_id(request):
    i = item.get_all_items_by_checklist_id(1)
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

def login(request):
    return render(request, 'login.html')
# def emai_check(user):
#     return user.email.end

# @user_passes_test(email_check)
@csrf_exempt
def user_login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        # the password verified for the user
        if user.is_active:
            print("User is valid, active and authenticated")
            return HttpResponse('Success', status=200)
        else:
            print"ej bra"
            return HttpResponse('Unauthorized', status=401)
    else:
        print "nej"
        return HttpResponse('Unauthorized', status=401)
    
    

def get_all_active_checkLists(request):
    all_active_checklists = checklist.get_all_active_checkLists()
    return HttpResponse(all_active_checklists)