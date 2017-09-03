from django.contrib.auth.models import User
from .models import Recipe
#from django.core import serializers
import json


def create(recipe, user_id):
	if not recipe is None: 
		user = User.objects.get(id=user_id)
		name = recipe['name']
		link = recipe['link']
		new_recipe = Recipe(name=name,link=link,created_user=user)
		new_recipe.save()
		return True
	else:
		return False
