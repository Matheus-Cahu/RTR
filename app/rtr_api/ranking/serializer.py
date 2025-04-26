# serializers.py

from rest_framework import serializers
from .models import Usuarios, Chaves

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuarios
        fields = '__all__'  # Se quiser listar campos específicos, posso mudar

class ChavesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chaves
        fields = '__all__'
