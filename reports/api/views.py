import requests
from django.core.files.uploadedfile import InMemoryUploadedFile
from  django.http import  FileResponse

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializers import (ReportSerializer, ReportCategorySerializer,
                          ChartSerializer, LabelSerializer, ValueSerializer)
from .models import Report, ReportCategory, Chart, Label, Value

from .settings import SERVICE_HOST


def is_staff(request):
    try:
        session_id = request.headers['Sessionid']
    except KeyError:
        session_id = ''
    user = requests.get(f'http://{SERVICE_HOST}:8001/current/',
                        headers={'sessionid': session_id}).json()
    if user['is_staff']:
        return True
    return False


def is_current(request):
    try:
        session_id = request.headers['Sessionid']
    except KeyError:
        session_id = ''
    user = requests.get(f'http://{SERVICE_HOST}:8001/current/',
                        headers={'sessionid': session_id}).json()
    if 'id' in user and user['id'] == int(request.data['of']):
        return True
    return False


def is_current_by_id(request, id):
    try:
        session_id = request.headers['Sessionid']
    except KeyError:
        session_id = ''
    user = requests.get(f'http://{SERVICE_HOST}:8001/current/',
                        headers={'sessionid': session_id}).json()
    if 'id' in user and user['id'] == id:
        return True
    return False


def is_sign_up(request):
    try:
        session_id = request.headers['Sessionid']
    except KeyError:
        session_id = ''
    user = requests.get(f'http://{SERVICE_HOST}:8001/current/',
                        headers={'sessionid': session_id}).json()
    if 'id' in user:
        return True
    return


@api_view(["GET"])
def get_all_by_of(request, *args, **kwargs):
    return Response(data=map(lambda x: ReportSerializer(x).data,
                             Report.objects.filter(of=kwargs["id"])))

@api_view(["GET"])
def get_all_by_to(request, *args, **kwargs):
    return Response(data=map(lambda x: ReportSerializer(x).data,
                             Report.objects.filter(to=kwargs["id"])))

@api_view(["GET"])
def get_file(request, *args, **kwargs):
    return FileResponse(open(Report.objects.get(id=kwargs["id"]).file.path, "rb"),
                        as_attachment=True)


class ReportListView(generics.CreateAPIView):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()

    def post(self, request, *args, **kwargs):
        ReportCategory.objects.get_or_create(name="task")
        ReportCategory.objects.get_or_create(name="other")
        data = {}
        for f in {"of": int, "to": int, "title": str,
                  "description": str, "category": int,
                  "file": InMemoryUploadedFile, "chart": int}:
            if f in request.data:
                data[f] = request.data[f]
            else:
                data[f] = None
        of = data["of"]
        to = data["to"]
        if to == of:
            return Response(status=400)
        title = data["title"]
        description = data["description"]
        category = ReportCategory.objects.get(pk=data["category"])
        file = data["file"]
        data = Report(of=of, to=to, title=title,
                      description=description, category=category,
                      file=file)
        data.save()

        if not is_current(request):
            return Response(status=403)
        return Response(data=ReportSerializer(data).data)


class ReportDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = ReportSerializer
    queryset = Report.objects.all()

    def get(self, request, *args, **kwargs):
        report = Report.objects.get(id=kwargs['pk'])
        if not (is_current_by_id(request, report.of) or is_current_by_id(request, report.to)):
            return Response(status=403)
        return Response(data=ReportSerializer(report).data)

    def update(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().delete(request, *args, **kwargs)


class ReportCategoryListView(generics.ListCreateAPIView):
    serializer_class = ReportCategorySerializer
    queryset = ReportCategory.objects.all()

    def get(self, request, *args, **kwargs):
        ReportCategory.objects.get_or_create(name="task")
        ReportCategory.objects.get_or_create(name="other")
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().post(request, *args, **kwargs)


class ReportCategoryDetailView(generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = ReportCategorySerializer
    queryset = ReportCategory.objects.all()

    def update(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if ReportCategory.objects.get(id=kwargs["pk"]).name in ["task", "other"]:
            return Response()
        if not is_staff(request):
            return Response(status=403)
        return super().delete(request, *args, **kwargs)


class ChartListView(generics.CreateAPIView):
    serializer_class = ChartSerializer
    queryset = Chart.objects.all()

    def post(self, request, *args, **kwargs):
        if not is_sign_up(request):
            return Response(status=403)
        return super().post(request, *args, **kwargs)


class ChartDetailView(generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = ChartSerializer
    queryset = Chart.objects.all()

    def update(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().delete(request, *args, **kwargs)


class LabelListView(generics.CreateAPIView):
    serializer_class = LabelSerializer
    queryset = Label.objects.all()

    def get(self, request, *args, **kwargs):
        return super().get(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        if not is_sign_up(request):
            return Response(status=403)
        return super().post(request, *args, **kwargs)


class LabelDetailView(generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = LabelSerializer
    queryset = Label.objects.all()

    def update(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().delete(request, *args, **kwargs)


class ValueListView(generics.CreateAPIView):
    serializer_class = ValueSerializer
    queryset = Value.objects.all()

    def post(self, request, *args, **kwargs):
        if not is_sign_up(request):
            return Response(status=403)
        return super().post(request, *args, **kwargs)


class ValueDetailView(generics.UpdateAPIView, generics.DestroyAPIView):
    serializer_class = ValueSerializer
    queryset = Value.objects.all()

    def update(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        if not is_staff(request):
            return Response(status=403)
        return super().delete(request, *args, **kwargs)

