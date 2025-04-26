from django.contrib import admin
from .models import Usuarios, Chaves

@admin.register(Usuarios)
class UsuariosAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'email', 'ultimo_pagamento', 'ranking')

@admin.register(Chaves)
class ChavesAdmin(admin.ModelAdmin):
    list_display = ('id', 'nome', 'valor')
