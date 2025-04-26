from django.db import models

class Usuario(models.Model):
    nome = models.CharField(max_length=100)
    email = models.EmailField(max_length=100, null=True, blank=True)
    ultimo_pagamento = models.DateTimeField(auto_now_add=True)
    ranking = models.CharField(max_length=10, null=True, blank=True)
    numero_de_vitorias = models.IntegerField(default=0)
    saldo_games = models.IntegerField(default=0)

    def __str__(self):
        return self.nome

class Chave(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    nome = models.CharField(max_length=10)
    valor = models.IntegerField()

    def __str__(self):
        return self.nome

class Jogos(models.Model):
    jogador1 = models.CharField(max_length=100)
    jogador2 = models.CharField(max_length=100)
    image_j1 = models.ImageField(upload_to='images/')
    image_j2 = models.ImageField(upload_to='images/')
    jogo1_g1 = models.IntegerField()
    jogo2_g1 = models.IntegerField()
    jogo1_g2 = models.IntegerField()
    jogo2_g2 = models.IntegerField()
    vencedor = models.CharField(max_length=100)
    data = models.DateTimeField(auto_now_add=True)
    horario = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, default='pendente')
    local = models.CharField(max_length=100, null=True, blank=True)    

    def __str__(self):
        return f"{self.jogador1} vs {self.jogador2}"

class Shop(models.Model):
    id = models.CharField(max_length=10, primary_key=True)
    nome = models.CharField(max_length=10)
    descricao = models.TextField()
    preco = models.IntegerField()
    image = models.ImageField(upload_to='images/')

    def __str__(self):
        return self.nome
