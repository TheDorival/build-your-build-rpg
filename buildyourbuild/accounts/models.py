from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):

    avatar = models.ImageField((""), upload_to=None, height_field=None, width_field=None, max_length=None)