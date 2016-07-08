# -*- coding: utf-8 -*-
from django.conf.urls import include, url

from django.contrib import admin
admin.autodiscover()

import hello.views

# Examples:
# url(r'^$', 'gettingstarted.views.home', name='home'),
# url(r'^blog/', include('blog.urls')),

urlpatterns = [
    url(r'^$', hello.views.index, name='index'),
    url(r'^db', hello.views.db, name='db'),
    url(r'^admin/', include(admin.site.urls)),
	url(r'^items/all', hello.views.get_all_items),
	url(r'^items/create/', hello.views.create_item),
	url(r'^items/update/', hello.views.update_item),
	url(r'^items/remove/', hello.views.remove_item),

	url(r'^activity/create/', hello.views.create_activity),
	url(r'^activity/all/', hello.views.get_all_activities),
	url(r'^activity/remove/', hello.views.remove_acticity),
	url(r'^weather/get/', hello.views.get_weather),


	
]
