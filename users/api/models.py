from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
import json

from .validators import SpaceValidator

# Create your models here.


# модель пользователя
class User(AbstractUser):
    username_validator = SpaceValidator
    id = models.AutoField(primary_key=True)
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        help_text=_(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    year_of_birth = models.IntegerField(default=18, null=True)
    about = models.CharField(max_length=1000, null=True, blank=True)
    categories = models.CharField(max_length=1000, default="{}")
    email = models.EmailField('email address', unique=True, blank=True, null=False)
    number = models.CharField('telephone number', unique=True, blank=True, null=True, max_length=100)
    image = models.ImageField(upload_to='images', null=True, blank=True)

    class Meta:
        ordering = ['year_of_birth']

    # метод, который преобразует поле categories в словарь объект,
    # устанавливает в нем значение и потом снова преобразует в строку
    def set_category_value(self, category, value):
        categories = json.loads(self.categories)
        categories[category] = value
        self.categories = json.dumps(categories)

    # метод, возвращающий словарь категорий
    def get_categories(self):
        return json.loads(self.categories)

    # метод, удаляющий категорию
    def remove_category(self, category):
        categories = json.loads(self.categories)
        del categories[category]
        self.categories = json.dumps(categories)

    def __str__(self):
        return f'{self.username} email: {self.email}'