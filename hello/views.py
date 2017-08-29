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

from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


# Create your views here.
def index(request):
    #userModel.remove_user_by_name("sara")
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
    checklist = request.POST.get("checklist", 1)
    item.create_item(name, checklist)
    return render(request, 'index.html')

def get_all_items(request):
    i = item.get_all_items()
    return HttpResponse(i)

@csrf_exempt
def get_all_items_by_checklist_id(request):
    print request
    id = request.GET.get("checklist_id", 0)
    print id 
    i = item.get_all_items_by_checklist_id(id)
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
    weather = requests.get('http://api.openweathermap.org/data/2.5/weather?q=Taormina&units=metric&appid=05cded3be7ec61a1bd04f1a39eb18a5')
    return HttpResponse(weather)

''' def login(request):
    return render(request, 'login.html') '''
# def emai_check(user):
#     return user.email.end

# @user_passes_test(email_check)
@csrf_exempt
def user_login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        print user.username
        token = Token.objects.get(user=user)
        # the password verified for the user
        if user.is_active:
            print("User is valid, active and authenticated")
            return HttpResponse(token, status=200)
        else:
            print"ej bra"
            return HttpResponse('Unauthorized', status=401)
    else:
        print "nej"
        return HttpResponse('Unauthorized', status=401)

def get_all_active_checkLists(request):
    all_active_checklists = checklist.get_all_active_checkLists()
    return HttpResponse(all_active_checklists)

@csrf_exempt
def create_checklist(request):
    name = request.POST['name']
    checklist.create_checklist(name)
    return HttpResponse('Success', status=200)

@csrf_exempt
def remove_checklist(request):
    id = request.POST['id']
    checklist.remove(id)
    return HttpResponse('Success', status=200)

@csrf_exempt
def update_checklist(request):
    id = request.POST['id']
    name = request.POST['name']
    checklist.update(id, name)
    return HttpResponse('Success', status=200)


def bundle(request):
    userData = user

@csrf_exempt
def authenticate_with_token (request):
    print request
    token = request.POST['token']
    token = Token.objects.get(key=token)
    if token is not None:
        user = userModel.get_user_by_id(token.user_id)
        print user
        #print user.email
        #serialize_user = serializers.serialize('json', user)
        #return HttpResponse(user, status=200)
        #data = serializers.serialize('json', [user])
        return HttpResponse(user, content_type='application/json')
    else:
        return HttpResponse('Unauthorized', status=401)

#### new stuff
@csrf_exempt
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        test = Token.objects.create(user=instance)
        print
    
    return HttpResponse('Ok', status=200)