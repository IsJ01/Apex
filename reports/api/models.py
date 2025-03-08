from django.db import models
from django.utils import timezone

# Create your models here.

# модель категории отчетов
class ReportCategory(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Report(models.Model):
    id = models.AutoField(primary_key=True)
    of = models.IntegerField(null=False)
    to = models.IntegerField(null=False)
    title = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=10000, null=True, blank=True)
    category = models.ForeignKey(ReportCategory, on_delete=models.CASCADE)
    file = models.FileField(upload_to="uploads/", null=True, blank=True, max_length=100000)
    checked = models.BooleanField(default=False)
    pub_date = models.DateTimeField(default=timezone.now, null=True)

    class Meta:
        ordering = ['pub_date']

    def __str__(self):
        return f'{self.title} to {self.to} categories: {self.category}'


class Chart(models.Model):
    types = (
        ("Line", "Line"),
        ("Tension Line", "Tension Line"),
        ("Scatter", "Scatter"),
        ("Bar", "Bar"),
        ("Pie", "Pie"),
        ("Doughnut", "Doughnut"),
        ("PolarArea", "PolarArea"),
        ("Radar", "Radar"),
    )
    report = models.ForeignKey(Report, null=True, on_delete=models.CASCADE)
    type = models.CharField(choices=types, max_length=12)


class Label(models.Model):
    chart = models.ForeignKey(Chart, on_delete=models.CASCADE)
    content = models.CharField(max_length=1000)


class Value(models.Model):
    chart = models.ForeignKey(Chart, on_delete=models.CASCADE)
    content = models.CharField(max_length=1000)
