from django.urls import path

from .consumers import ConsumerClient

ws_route = [
    path('ws/server-chat/' , ConsumerClient().as_asgi()),
]