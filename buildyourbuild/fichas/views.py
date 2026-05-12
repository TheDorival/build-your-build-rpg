from django.shortcuts import render
from . models import Personagens

# Create your views here.
def index(request):
    personagens = Personagens.objects.all().order_by('-date')
    return render(request, 'personagem/index.html', { 'personagens': personagens})

def personagem(request, slug):
    personagem = Personagens.objects.get(slug=slug)
    return render(request, 'personagem/personagem.html', { 'personagem': personagem})