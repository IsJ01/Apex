from django.db import models


# модель свойств орагнизации
class OrganizationProperty(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100, unique=True)
    value = models.CharField(max_length=100, default='')

    class Meta:
        db_table = 'organization_data'

    def __str__(self):
        return self.name
