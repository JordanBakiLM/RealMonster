from django.urls import path
from .views import interfaceView

urlpatterns = [
    path('', interfaceView),
]
