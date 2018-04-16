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
	url(r'^items/create', hello.views.create_item),
	url(r'^items/update', hello.views.update_item),
	url(r'^items/remove', hello.views.remove_item),


	url(r'^activity/create', hello.views.create_activity),
	url(r'^activity/all', hello.views.get_all_activities),
	url(r'^activity/remove', hello.views.remove_acticity),
	url(r'^weather/get/', hello.views.get_weather),

	url(r'^login/$', hello.views.user_login),
	url(r'^login/user', hello.views.get_user_by_token),

	url(r'^loginpage', hello.views.login),

	url(r'^checklist/create', hello.views.create_checklist),
	url(r'^checklists/all', hello.views.get_all_active_checkLists),
	url(r'^checklists/remove', hello.views.remove_checklist),
	url(r'^checklist/items', hello.views.get_all_items_by_checklist_id),
	url(r'^checklist/update', hello.views.update_checklist),
	url(r'^checklist/all_new', hello.views.get_checklists),

	url(r'^user/authenticate', hello.views.authenticate_with_token),
	url(r'^user/update', hello.views.update_user),

	url(r'^recipe/create', hello.views.create_recipe),
	url(r'^recipe/get', hello.views.get_last_ten_recipes),
	url(r'^recipe/remove', hello.views.remove_recipe),
	url(r'^recipe/update', hello.views.update_recipe)



	#,url(r'^get_auth_token/$', hello.views.create_auth_token, name='get_auth_token')
]
