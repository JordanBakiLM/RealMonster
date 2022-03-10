"""
ASGI config for serverChat project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application

from channels.routing import ProtocolTypeRouter , URLRouter
from channels.auth import AuthMiddlewareStack
from chat.routing import ws_route

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'serverChat.settings')

application = ProtocolTypeRouter(
    {
        'http' : get_asgi_application(),
        'websocket' : AuthMiddlewareStack(
            URLRouter(ws_route)
        )
    }
)
