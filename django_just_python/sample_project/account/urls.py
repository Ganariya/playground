from django.urls import path, reverse
from . import views

app_name = 'account'
urlpatterns = [
    path("account", views.index, name="index")
]
