from django.contrib.auth.models import User


def create_user():
	user = User.objects.create_user('mette', 'mettdahm100@gmail.com', 'apa')
	user.last_name = "dahm"
	user.save

def login():
	print "lil"