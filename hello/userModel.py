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
	#data = serializers.serialize('json', [user])
	return user


def mappedUser(rawUser):
	user = {}
	print rawUser
	user['id'] = rawUser.id
	user['username'] = rawUser.username
	user['email'] = rawUser.email
	user['first_name'] = rawUser.first_name
	user['last_name'] = rawUser.last_name
	json_data = json.dumps(user)
	return json_data
	