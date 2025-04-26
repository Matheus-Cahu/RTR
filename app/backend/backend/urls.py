from django.contrib import admin
from django.urls import path, include
from rtr import views
from django.http import HttpResponse


def home(request):
    return HttpResponse("Página inicial do site!")


urlpatterns = [
    path('home/', home),  # Página inicial
    path('admin/', admin.site.urls),  # URL do admin
    path('rtr/', include('rtr.urls')),  # URL da aplicação 'rtr'
    path('', home),  # Página inicial quando acessar apenas '/'
    path('usuario/', views.usuario_list),  # URL de usuários
    path('usuario/<int:id>/', views.usuario_list),  # URL para detalhes de usuário
]
