from django.urls import path
from . import views

urlpatterns = [
    path('usuarios/', views.UsuariosListView.as_view(), name='usuarios_list'),
    path('usuarios/<int:id>/', views.UsuariosDetailView.as_view(), name='usuarios_detail'),
    
    path('chaves/', views.ChavesListView.as_view(), name='chaves_list'),
    path('chaves/<int:id>/', views.ChavesDetailView.as_view(), name='chaves_detail'),

    path('atualizar_ranking/', views.AtualizarRankingView.as_view(), name='atualizar_ranking'),
]
