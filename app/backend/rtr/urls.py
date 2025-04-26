# rtr/urls.py
from django.urls import path
from . import views

urlpatterns = [
    # URLs para Usuários
    path('usuario/', views.usuario_list),
    path('usuario/<int:id>/', views.usuario_list),
    
    # URLs para Chaves
    path('chave/', views.chave_list),
    path('chave/<int:id>/', views.chave_list),
]
