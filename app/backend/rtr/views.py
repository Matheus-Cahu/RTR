from django.http import JsonResponse
from rtr.models import Usuario, Chave
from rtr.serializers import UsuarioSerializer, ChaveSerializer
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.core.exceptions import ObjectDoesNotExist

def home(request):
    return HttpResponse("Bem-vindo à página inicial!")

@csrf_exempt
def usuario_list(request, id=None):
    if request.method == 'GET':
        if id:
            try:
                usuario = Usuario.objects.get(id=id)
                usuario_serializer = UsuarioSerializer(usuario)
                return JsonResponse(usuario_serializer.data)
            except ObjectDoesNotExist:
                return JsonResponse({"error": "Usuário não encontrado!"}, status=404)
        else:
            usuarios = Usuario.objects.all()
            usuario_serializer = UsuarioSerializer(usuarios, many=True)
            return JsonResponse(usuario_serializer.data, safe=False)

    elif request.method == 'POST':
        usuario_data = JSONParser().parse(request)
        usuario_serializer = UsuarioSerializer(data=usuario_data)
        if usuario_serializer.is_valid():
            usuario_serializer.save()
            return JsonResponse({"message": "Usuário adicionado com sucesso!"}, status=201)
        return JsonResponse({"error": "Falha ao adicionar usuário"}, status=400)

    elif request.method == 'PUT':
        usuario_data = JSONParser().parse(request)
        try:
            usuario = Usuario.objects.get(id=usuario_data['id'])
            usuario_serializer = UsuarioSerializer(usuario, data=usuario_data)
            if usuario_serializer.is_valid():
                usuario_serializer.save()
                return JsonResponse({"message": "Usuário atualizado com sucesso!"})
            return JsonResponse({"error": "Falha ao atualizar usuário"}, status=400)
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Usuário não encontrado!"}, status=404)

    elif request.method == 'DELETE':
        try:
            usuario = Usuario.objects.get(id=id)
            usuario.delete()
            return JsonResponse({"message": "Usuário deletado com sucesso!"})
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Usuário não encontrado!"}, status=404)

@csrf_exempt
def chave_list(request, id=None):
    if request.method == 'GET':
        if id:
            try:
                chave = Chave.objects.get(id=id)
                chave_serializer = ChaveSerializer(chave)
                return JsonResponse(chave_serializer.data)
            except ObjectDoesNotExist:
                return JsonResponse({"error": "Chave não encontrada!"}, status=404)
        else:
            chaves = Chave.objects.all()
            chave_serializer = ChaveSerializer(chaves, many=True)
            return JsonResponse(chave_serializer.data, safe=False)

    elif request.method == 'POST':
        chave_data = JSONParser().parse(request)
        chave_serializer = ChaveSerializer(data=chave_data)
        if chave_serializer.is_valid():
            chave_serializer.save()
            return JsonResponse({"message": "Chave adicionada com sucesso!"}, status=201)
        return JsonResponse({"error": "Falha ao adicionar chave"}, status=400)

    elif request.method == 'PUT':
        chave_data = JSONParser().parse(request)
        try:
            chave = Chave.objects.get(id=chave_data['id'])
            chave_serializer = ChaveSerializer(chave, data=chave_data)
            if chave_serializer.is_valid():
                chave_serializer.save()
                return JsonResponse({"message": "Chave atualizada com sucesso!"})
            return JsonResponse({"error": "Falha ao atualizar chave"}, status=400)
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Chave não encontrada!"}, status=404)

    elif request.method == 'DELETE':
        try:
            chave = Chave.objects.get(id=id)
            chave.delete()
            return JsonResponse({"message": "Chave deletada com sucesso!"})
        except ObjectDoesNotExist:
            return JsonResponse({"error": "Chave não encontrada!"}, status=404)
