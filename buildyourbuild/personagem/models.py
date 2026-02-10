from django.db import models
from django.utils.text import slugify

# Create your models here.

class Personagens(models.Model):

    class Meta:
        verbose_name = 'Personagem'
        verbose_name_plural = 'Personagens'

    title = models.CharField(max_length=75, verbose_name="Nome do Personagem")
    body = models.TextField(verbose_name="Descrição")
    slug = models.SlugField()
    date = models.DateTimeField(auto_now_add= True, verbose_name="Data de Criação")
    updated = models.DateTimeField(auto_now=True, verbose_name="Última Atualização")
    sistema = models.CharField(max_length=100, blank=True, null=True, verbose_name="Sistema de RPG")
    nivel = models.IntegerField(default=1, verbose_name="Nível")
    classe = models.CharField(max_length=100, blank=True, null=True, verbose_name="Classe")
    raca = models.CharField(max_length=100, blank=True, null=True, verbose_name="Raça")
    experiencia = models.IntegerField(default=0, verbose_name="XP")
    
    banner = models.ImageField(
        upload_to='personagens/banners/',
        blank=True,
        null=True,
        verbose_name="Banner do Personagem",
        help_text="Imagem de banner (opcional). Recomendado: 1200x400px"
    )

    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # Gera slug automaticamente se não existir
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)
