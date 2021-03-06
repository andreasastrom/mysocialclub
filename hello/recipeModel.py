from django.contrib.auth.models import User
from .models import Recipe
#from django.core import serializers
import json


def create(recipe, user_id):
	if not recipe is None: 
		user = User.objects.get(id=user_id)
		name = recipe['name']
		link = recipe['link']
		vegetarian = recipe['vegetarian']
		new_recipe = Recipe(name=name,link=link,vegetarian=vegetarian,created_user=user)
		new_recipe.save()
		return True
	else:
		return False


def get():
	recipes = Recipe.objects.filter(deleted=0).order_by('-createdtime')[:10]
	mappedRecipes = []
	for recipe in recipes:
		mappedRecipes.append(recipe_mapper(recipe))
	return json.dumps(mappedRecipes)

def remove(id):
	rec = Recipe.objects.filter(id=id)
	if rec is not None:
		rec.update(deleted = 1)
		return True
	else:
		return False

def update(recipe):
	if not recipe is None:
		oldRecipe = Recipe.objects.get(id=recipe['id'])
		if oldRecipe is not None:
			oldRecipe.name = recipe['name']
			print recipe['favorite']
			oldRecipe.favorite = bool(recipe['favorite'])
			oldRecipe.save()
			return True
		else:
			return False
		return True
	else:
		return False

def recipe_mapper(rawRecipe):
	recipe = {}
	recipe['id'] = rawRecipe.id
	recipe['name'] = rawRecipe.name
	recipe['link'] = rawRecipe.link
	recipe['vegetarian'] = rawRecipe.vegetarian
	recipe['favorite'] = rawRecipe.favorite
	return recipe