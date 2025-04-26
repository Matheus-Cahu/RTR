from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Example API View
class HelloWorldAPIView(APIView):
    def get(self, request):
        return Response({"message": "Hello, World!"}, status=status.HTTP_200_OK)

# URL Configuration
urlpatterns = [
    path('api/hello/', HelloWorldAPIView.as_view(), name='hello-world'),
]