from django.db import models

class Chaves(models.Model):
    id = models.AutoField(primary_key=True)  
    nome = models.CharField(max_length=1)  
    valor = models.IntegerField() 
    jogadores = models.JSONField(default=list) 

    class Meta:
        managed = False
        db_table = 'chaves'


# Classe para representar os usuários/jogadores
class Usuarios(models.Model):
    nome = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS')
    email = models.CharField(max_length=100, db_collation='Latin1_General_CI_AS', blank=True, null=True)
    ultimo_pagamento = models.DateTimeField(blank=True, null=True)
    numero_de_vitorias = models.IntegerField(default=0)
    ranking = models.ForeignKey(Chaves, on_delete=models.SET_NULL, null=True, related_name='usuarios_ranking')
    class Meta:
        managed = False
        db_table = 'usuarios'
