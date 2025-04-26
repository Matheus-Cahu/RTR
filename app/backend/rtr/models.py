from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    email = models.CharField(max_length=100, blank=True, null=True)
    ultimo_pagamento = models.DateTimeField(auto_now_add=True)
    ranking = models.CharField(max_length=10, blank=True, null=True)
    numero_de_vitorias = models.IntegerField(default=0)
    saldo_games = models.IntegerField(default=0)

    def __str__(self):
        return self.nome

class Chave(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    nome = models.CharField(max_length=10)
    valor = models.IntegerField()
    def __str__(self):
        return f'{self.nome} ({self.valor})'
