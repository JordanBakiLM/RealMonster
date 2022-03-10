
from django.utils import timezone
from django.db import models

# Create your models here.

class Client(models.Model):
    channelNom = models.CharField(max_length=100 , primary_key=True)
    speudo = models.CharField(max_length=20)
    date = models.DateField(default=timezone.now())
