from django.contrib import admin
from . models import Personagens

# Register your models here.

@admin.register(Personagens)
class PersonagemAdmin(admin.ModelAdmin):
    list_display = ['title', 'date', 'updated']
    list_filter = ['date', 'updated']
    search_fields = ['title', 'body']
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ['date', 'updated']
    
    fieldsets = (
        ('Informações Básicas', {
            'fields': ('title', 'slug', 'body')
        }),
        ('Mídia', {
            'fields': ('banner',),
            'description': 'Upload de imagem para o banner do personagem (opcional)'
        }),
        ('Metadados', {
            'fields': ('date', 'updated'),
            'classes': ('collapse',)
        }),
    )