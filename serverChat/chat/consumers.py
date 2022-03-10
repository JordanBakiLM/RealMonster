import json
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from .models import Client
from asgiref.sync import async_to_sync



class ConsumerClient(AsyncJsonWebsocketConsumer):
    async def connect(self):
        await self.channel_layer.group_add("chat",self.channel_name)
        await self.accept()
        await self.send_json({
            'type' : 'connection etablie',
            'content' : 'vous etes connecte et votre nom est ' + self.channel_name
        })

    async def receive(self, text_data,):
        text_data_json = json.loads(text_data)
        type = text_data_json['type']
        content = text_data_json['content']

        if (type == "demande d'ajout"):
            cn = self.channel_name
            client = Client(channelNom = cn , speudo=content["sender"])
            # client.save()
            clients = Client.objects.values_list()
            liste = ["jordan","stevie",'roland']
            date = ["12/02/2001","12/02/2001","12/02/2001"]
            # for cl in clients:
            #     liste.append(cl[1])
            #     date.append(cl[2])
                
            await self.channel_layer.group_send(
                "chat",
                {
                    'type' : "nouvel_utilisateur",
                    'content' : {'user':liste , 'date':date}
                }
            )

        elif(type == "nouveau message"):
            print(content["sender"] + " : " + content["message"])
            await self.channel_layer.group_send(
                "chat",
                {
                    'type' : "nouveau_message",
                    'content' : {'sender':content["sender"], 'message':content["message"]}
                }
            )

    async def nouvel_utilisateur(self,event):
        await self.send_json({
            'type' : "nouvel_utilisateur",
            'content' : event['content']
        })

    async def nouveau_message(self, event):
        await self.send_json({
            "type" : "nouveau_message",
            "content" : event["content"]
        })
