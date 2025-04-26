from django.views import View
from django.http import JsonResponse
from .models import Usuarios, Chaves  # Importa os models certos

# Listar todos os usuários
class UsuariosListView(View):
    def get(self, request):
        usuarios = Usuarios.objects.all()
        data = [
            {
                'id': usuario.id,
                'nome': usuario.nome,
                'vitorias': usuario.vitorias,
            }
            for usuario in usuarios
        ]
        return JsonResponse(data, safe=False)

# Detalhar um usuário específico
class UsuariosDetailView(View):
    def get(self, request, id):
        try:
            usuario = Usuarios.objects.get(pk=id)
            data = {
                'id': usuario.id,
                'nome': usuario.nome,
                'vitorias': usuario.vitorias,
            }
            return JsonResponse(data)
        except Usuarios.DoesNotExist:
            return JsonResponse({'error': 'Usuário não encontrado'}, status=404)
class ChavesListView(View):
    def get(self, request):
        chaves = Chaves.objects.all()
        data = [
            {
                'id': chave.id,
                'nome': chave.nome,
                'valor': chave.valor,
            }
            for chave in chaves
        ]
        return JsonResponse(data, safe=False)
class ChavesDetailView(View):
    def get(self, request, id):
        try:
            chave = Chaves.objects.get(pk=id)
            data = {
                'id': chave.id,
                'nome': chave.nome,
                'valor': chave.valor,
            }
            return JsonResponse(data)
        except Chaves.DoesNotExist:
            return JsonResponse({'error': 'Chave não encontrada'}, status=404)
class AtualizarRankingView(View):
    def post(self, request):
        jogadores = list(Usuarios.objects.all().order_by('-vitorias'))

        grupos = []
        grupo_atual = []
        
        for i, jogador in enumerate(jogadores):
            grupo_atual.append(jogador)
            if (i + 1) % 3 == 0 or i == len(jogadores) - 1:
                grupos.append(grupo_atual)
                grupo_atual = []

        # Agora atualiza o nome da chave de cada jogador
        letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        for idx, grupo in enumerate(grupos):
            letra_grupo = letras[idx]
            nome_chave = f"Rank {letra_grupo}"

            # Tenta buscar ou criar a chave no banco
            chave, _ = Chaves.objects.get_or_create(nome=nome_chave, defaults={'valor': idx})

            for jogador in grupo:
                jogador.chave = chave
                jogador.save()

        return JsonResponse({'message': 'Ranking atualizado com sucesso!'})