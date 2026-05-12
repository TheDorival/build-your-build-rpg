from django.urls import path
from . import views

app_name = 'personagem'

urlpatterns = [
    path('', views.index, name= "personagens"),
    path('<slug:slug>', views.personagem, name= "personagem")
]