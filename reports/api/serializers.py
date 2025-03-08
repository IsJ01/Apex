import os.path

from rest_framework import serializers
from .models import Report, ReportCategory, Chart, Label, Value

def get_or_none(obj, **kwargs):
    try:
        return obj.objects.get(**kwargs)
    except obj.DoesNotExist:
        return None


class ReportCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportCategory
        fields = ["id", "name"]


class ReportSerializer(serializers.ModelSerializer):
    chart = serializers.SerializerMethodField()
    file = serializers.SerializerMethodField()
    pub_date = serializers.SerializerMethodField()
    category = serializers.SerializerMethodField()

    class Meta:
        model = Report
        fields = ['id', 'of', 'to', 'title', 'description',
                  'category', "file", "chart", "checked", 'pub_date']

    def get_chart(self, obj: Report):
        chart = get_or_none(Chart, report=obj.id)
        if chart:
            return ChartSerializer(chart).data
        return None

    def get_file(self, obj: Report):
        fileName = obj.file.path
        if os.path.isfile(fileName):
            return obj.file.name
        return None

    def get_pub_date(self, obj: Report):
        return ':'.join(obj.pub_date.__str__().replace("T", " ").split(":")[:-2])

    def get_category(self, obj: Report):
        category = obj.category
        if category:
            return ReportCategorySerializer(category).data
        return None


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = ['id', 'chart', 'content']


class ValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = Value
        fields = ['id', 'chart', 'content']


class ChartSerializer(serializers.ModelSerializer):
    labels = serializers.SerializerMethodField()
    values = serializers.SerializerMethodField()

    class Meta:
        model = Chart
        fields = ['id', 'report', 'type', "labels", "values"]

    def get_labels(self, obj: Chart):
        data = []
        for label in obj.label_set.all():
            data.append(LabelSerializer(label).data)
        return data

    def get_values(self, obj: Chart):
        data = []
        for value in obj.value_set.all():
            data.append(ValueSerializer(value).data)
        return data

