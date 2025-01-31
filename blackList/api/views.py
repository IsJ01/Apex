import requests

from rest_framework import generics
from rest_framework.response import Response

from .serializers import BlackUserSerializer
from .models import BlackUser


def is_staff(request):
    try:
        session_id = request.headers['Sessionid']
    except KeyError:
        session_id = ''
    user = requests.get('http://users:8001/current/',
                        headers={'sessionid': session_id}).json()
    if user['is_staff']:
        return True
    return False


class BlackUserListView(generics.ListCreateAPIView):
    serializer_class = BlackUserSerializer
    queryset = BlackUser.objects.all()

    def post(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().post(request, *args, **kwargs)


class BlackUserDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BlackUserSerializer
    queryset = BlackUser.objects.all()

    def update(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().delete(request, *args, **kwargs)
