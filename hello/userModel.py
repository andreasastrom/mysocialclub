from django.contrib.auth.models import User


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