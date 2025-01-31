from rest_framework import serializers
from .models import ReportCategory


class ReportCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportCategory
        fields = ['id', 'name']
