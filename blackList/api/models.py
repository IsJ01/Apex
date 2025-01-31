from django.db import models
from django.utils import timezone

# Create your models here.


class BlackUser(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.IntegerField(unique=True)
    cause = models.CharField(max_length=10000)
    date_added = models.DateTimeField(default=timezone.now, null=True)

    class Meta:
        db_table = "black_list"
