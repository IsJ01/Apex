from django.db import models
from django.utils import timezone

# Create your models here.


class Report(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=10000, null=True, blank=True)
    of = models.IntegerField()
    to = models.IntegerField()
    status = models.CharField(max_length=30, choices=(('Under consideration', 'Under consideration'),
                                                      ('accepted', 'accepted'),
                                                      ('rejected', 'rejected')), default='Under consideration')
    pub_date = models.DateTimeField(default=timezone.now, null=True)
    category = models.IntegerField(default=-1, null=True)

    class Meta:
        ordering = ['pub_date']

    def __str__(self):
        return f'{self.title} to {self.to} categories: {self.category}'
