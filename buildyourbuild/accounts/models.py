from django.db import models
from django.contrib.auth.models import AbstractUser

class Usuario(AbstractUser):

    avatar = models.ImageField("Avatar", upload_to='avatars/', blank=True, null=True)