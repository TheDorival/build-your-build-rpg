from django.shortcuts import render
from . models import Personagem

# Create your views here.
def index(request):
    personagens = Personagem.objects.all().order_by('-date')
    return render(request, 'personagem/index.html', { 'personagens': personagens})

def personagem(request, slug):
    personagem = Personagem.objects.get(slug=slug)
    return render(request, 'personagem/personagem.html', { 'personagem': personagem})