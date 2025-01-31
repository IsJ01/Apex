from rest_framework import serializers
from .models import OrganizationProperty


class OrganizationPropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = OrganizationProperty
        fields = ['id', 'name', 'value']
