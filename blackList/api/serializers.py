from rest_framework import serializers
from .models import BlackUser


class BlackUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlackUser
        fields = ['id', 'user', 'cause']
