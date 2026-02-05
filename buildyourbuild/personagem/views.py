from django.shortcuts import render

# Create your views here.
def personagem_home(request):
    return render(request, 'personagem/personagem_home.html')