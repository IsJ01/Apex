from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'number', 'categories',
                  'year_of_birth', 'about', 'image', 'is_staff', 'is_superuser']

