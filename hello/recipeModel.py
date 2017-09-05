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


def get():
	recipes = Recipe.objects.all()[:10]
	mappedRecipes = []
	for recipe in recipes:
		mappedRecipes.append(recipe_mapper(recipe))
	return json.dumps(mappedRecipes)

def recipe_mapper(rawRecipe):
	recipe = {}
	recipe['id'] = rawRecipe.id
	recipe['name'] = rawRecipe.name
	recipe['link'] = rawRecipe.link
	return recipe