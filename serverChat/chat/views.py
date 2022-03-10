from django.shortcuts import render

# Create your views here.

def interfaceView(request):
    return(render(request,'index.html'))
