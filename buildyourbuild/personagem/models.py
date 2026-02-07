from django.db import models

# Create your models here.

class Personagens(models.Model):

    class Meta:
        verbose_name = 'Personagem'
        verbose_name_plural = 'Personagens'

    title = models.CharField(max_length=75)
    body = models.TextField()
    slug = models.SlugField()
    date = models.DateTimeField(auto_now_add= True)

    def __str__(self):
        return self.title