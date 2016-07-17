from django.contrib.auth.models import User


def create_user():
	user = User.objects.create_user('andreas', 'andreas@mysite.se', '123')
	user.last_name = "astrom"
	user.save

def login():
	print "lil"