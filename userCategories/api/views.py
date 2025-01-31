import requests

from rest_framework import generics
from rest_framework.response import Response

from .serializers import UserCategorySerializer
from .models import UserCategory


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


class UserCategoryListView(generics.ListCreateAPIView):
    serializer_class = UserCategorySerializer
    queryset = UserCategory.objects.all()

    def post(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().post(request, *args, **kwargs)


class UserCategoryDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserCategorySerializer
    queryset = UserCategory.objects.all()

    def update(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().delete(request, *args, **kwargs)
