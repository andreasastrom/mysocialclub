from django.contrib.auth.models import User
#from django.core import serializers
import json

def create_user():
	user = User.objects.create_user('sara', '', 'pussgurka')
	user.last_name = "sara"
	user.save

def login():
	print "lil"


def list_all_users():
	users = User.objects.all()
	for user in users:
		print user.username

def remove_user_by_name(username):
	user = User.objects.filter(username = username)
	user.delete()


def get_user_by_id(id):
	user_data = User.objects.get(id=id)
	user = mappedUser(user_data)
	return user

def mappedUser(rawUser):
	user = {}
	user['id'] = rawUser.id
	user['username'] = rawUser.username
	user['email'] = rawUser.email
	user['first_name'] = rawUser.first_name
	user['last_name'] = rawUser.last_name
	json_data = json.dumps(user)
	return json_data

def update(userData):
	if userData is not None:
		new_user = json.loads(userData)
		user = User.objects.get(id=new_user['id'])
		if user is not None:
			user.username = new_user['username']
			user.first_name = new_user['firstname']
			user.last_name = new_user['lastname']
			user.email = new_user['email']
			user.save()
			return True
		else:
			return False
	else:
		return False

