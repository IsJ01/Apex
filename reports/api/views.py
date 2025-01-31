import requests

from rest_framework import generics
from rest_framework.response import Response

from .serializers import ReportSerializer
from .models import Report


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


def is_current(request):
    try:
        session_id = request.headers['Sessionid']
    except KeyError:
        session_id = ''
    user = requests.get('http://users:8001/current/',
                        headers={'sessionid': session_id}).json()
    if 'id' in user and user['id'] == int(request.data['of']):
        return True
    return False


class ReportListView(generics.ListCreateAPIView):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()

    def post(self, request, *args, **kwargs):
        if not is_current(request):
            return Response(status=403)
        return super().post(request, *args, **kwargs)


class ReportDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()

    def update(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().delete(request, *args, **kwargs)
