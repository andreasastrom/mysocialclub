# -*- coding: utf-8 -*-
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect

from django.core import serializers
from .models import Greeting
import requests
import json

from hello import item, activity, userModel, checklist, recipeModel
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

def get_all_items(request):
    i = item.get_all_items()
    return HttpResponse(i)

@csrf_exempt
def get_all_items_by_checklist_id(request):
    id = request.GET.get("checklist_id", 0)
    i = item.get_all_items_by_checklist_id(id)
    return HttpResponse(i)

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
    activity.remove_acticity(id)
    return render(request, 'index.html')


def get_weather(request):
    weather = requests.get('http://api.openweathermap.org/data/2.5/weather?q=Taormina&units=metric&appid=05cded3be7ec61a1bd04f1a39eb18a5')
    return HttpResponse(weather)

@csrf_exempt
def get_all_active_checkLists(request):
    user_id = request.GET['user_id']
    if user_id is not None:
        all_active_checklists = checklist.get_all_active_checkLists(user_id)
        return HttpResponse(all_active_checklists, content_type='application/json', status=200)
    else:
        return HttpResponse('Error', status=404)

@csrf_exempt
def create_checklist(request):
    name = request.POST['name']
    user_id = int(request.POST['user_id'])
    checklist.create_checklist(name, user_id)
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
    shared = request.POST['shared']
    checklist.update(id, shared, name)
    return HttpResponse('Success', status=200)


def bundle(request):
    userData = user

#### new stuff
@csrf_exempt
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        test = Token.objects.create(user=instance)
    return HttpResponse('Ok', status=200)



### NEW GOOD STUFFE 2017
#USER
@csrf_exempt
def update_user(request):
    user = request.body
    response = userModel.update(user)
    if response:
        return HttpResponse('Success', status=200)
    else:
        return HttpResponse('Error', status=404)


#RECIPE
@csrf_exempt
def create_recipe(request):
    if request.body is not None:
        data = json.loads(request.body)
        recipe = data['recipe']
        user_id = int(data['user_id'])
        recipe_response = recipeModel.create(recipe, user_id)
        if recipe_response:
            return HttpResponse('Success', status=200)
        else:
            return HttpResponse('Error', status=404)
    else:
        return HttpResponse('Error', status=404)

@csrf_exempt
def get_last_ten_recipes(request):
    recipes = recipeModel.get()
    if recipes is not None:
        return HttpResponse(recipes, content_type='application/json', status=200)
    else:
        return HttpResponse('Error', status=404)

@csrf_exempt
def remove_recipe(request):
    if request.body is not None:
        data = json.loads(request.body)
        id = data['id']
        status = recipeModel.remove(id)
        if status:
            return HttpResponse('Success', status=200)
        else:
            return HttpResponse('Error', status=404)
    else:
        return HttpResponse('Error', status=404)

@csrf_exempt
def update_recipe(request):
    if request.body is not None:
        recipe = json.loads(request.body)
        status = recipeModel.update(recipe)
        if status:
            return HttpResponse('Success', status=200)
        else:
            return HttpResponse('Error', status=404)
    else:
        return HttpResponse('Error', status=404)

#LOGIN
@csrf_exempt
def user_login(request):
    username = request.POST['username']
    password = request.POST['password']
    user = authenticate(username=username, password=password)
    if user is not None:
        token = Token.objects.get(user=user)
        if user.is_active:
            return HttpResponse(token, status=200)
        else:
            return HttpResponse('Unauthorized', status=401)
    else:
        return HttpResponse('Unauthorized', status=401)

@csrf_exempt
def get_user_by_token(request):
    if request is not None:
        data = json.loads(request.body)
        key = str(data['token'])
        if key is not None:
            token = Token.objects.get(key=key)
            if token is not None:
                user = userModel.get_user_by_id(token.user_id)
                if user is not None:
                    return HttpResponse(user, status=200)
                else:
                    return HttpResponse('Error', status=404)
            else:
                return HttpResponse('Error', status=404)
        else:
            return HttpResponse('Error', status=404)
    else:
        return HttpResponse('Error', status=404)

## DESSA TVÅ SKA SLÅS IHOP.
@csrf_exempt
def authenticate_with_token (request):
    token = request.POST['token']
    token = Token.objects.get(key=token)
    if token is not None:
        user = userModel.get_user_by_id(token.user_id)
        return HttpResponse(user, content_type='application/json')
    else:
        return HttpResponse('Unauthorized', status=401)

#CHECKLIST
@csrf_exempt
def get_checklists(request):
    print request.GET['user_id']
    if request is not None:
        user_id = request.GET['user_id']
        checklists = checklist.checklists(user_id)
        return HttpResponse(checklists, status=200)
    else:
        return HttpResponse('Error', status=404)


#ITEM
@csrf_exempt
def remove_item(request):
    if not request is None:
        data = json.loads(request.body)
        id = data["id"]
        item.remove_item(id)
        return HttpResponse('Success', status=200)
    else:
        return HttpResponse('Error', status=404)


@csrf_exempt
def create_item(request):
    if not request is None:
        data = json.loads(request.body)
        name = data["name"]
        checklist = data["checklist"]
        newItem = item.create_item(name, checklist)
        print newItem
        return HttpResponse(newItem, status=200)
    else:
        return HttpResponse('Error', status=404)