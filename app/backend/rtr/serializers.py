from rest_framework import serializers
from rtr.models import Usuario, Chave

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model= Usuario
        fields = '__all__'
        
class ChaveSerializer(serializers.ModelSerializer):
    class Meta:
        model= Chave
        fields = '__all__'
        