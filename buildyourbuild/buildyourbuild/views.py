from django.shortcuts import render

def index(request):
    return render(request, 'index.html')

def personagem(request):
    return render(request, 'personagem.html')