from django.urls import path
from .views import main_view
from django.views.generic import RedirectView
from django.urls import include, re_path

urlpatterns = [
    path('', main_view, name='main_view'),
    re_path(r'^favicon\.ico$',RedirectView.as_view(url='/static/images/favicon.ico')),

]