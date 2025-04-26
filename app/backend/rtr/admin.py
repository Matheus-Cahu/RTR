from django.contrib import admin

from django.contrib import admin
from .models import Usuario, Chave, Jogos, Shop

admin.site.register(Usuario)
admin.site.register(Chave)
admin.site.register(Jogos)
admin.site.register(Shop)

