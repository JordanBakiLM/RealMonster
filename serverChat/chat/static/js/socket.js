//recuperation pour l'initialisation de la connexion avec le server 
var formConnection = document.getElementById("connect")
var boutonConnexion = document.getElementById("btnConnect")

var users = document.getElementById("utilisateur")

var send = document.getElementById("btnsend")
var fichier = document.getElementById("monIF")
var boxMessage  = document.getElementById("box-messages")
var message = document.getElementById("message")



var socketClient = new Object()

formConnection.onsubmit = function(event){
    event.preventDefault()
    let speudo = event.target.speudo.value

    initConnexion(socketClient ,speudo)

}

function initConnexion(sock , sp){
    sock = new WebSocket(`ws://${window.location.host}/ws/server-chat/`)

    sock.onopen = function(event){
        alert ('Vous êtes conecté(e) avec le server !!!')
        boutonConnexion.className = "btn disabled"
        send.className = 'btn'

        sock.send(JSON.stringify({
            "type" : "demande d'ajout",
            'content' :{"sender" : sp}
        }))
    }

    sock.onerror = function(event){
        alert ('Vous avez eté deconecté(e) avec le server !!!')
        boutonConnexion.className = "btn active"
    }

    sock.onmessage = function(event){
        let data = JSON.parse(event.data)

        switch (data['type']) {
            case "nouvel_utilisateur":
                users.innerHTML=''
                var membre = ""
                for (var item=0 ; item<data["content"]['user'].length ; item++){
                    var li = document.createElement("li")
                    if(data["content"]["user"][item] == sp){
                        li.className = "person active-user"
                    }
                    else{
                        li.className = "person"
                    }
        
                    var i = document.createElement("i")
                    i.className = "fa fa-user"

                    var div = document.createElement("div")
                    div.className = "user"

                    var span1 = document.createElement('span')
                    span1.className = "status online"

                    var p = document.createElement('p')
                    p.className = "name-time"

                    var span2 = document.createElement('span')
                    var nom = document.createTextNode(` ${data["content"]["user"][item]} `)
                    span2.className = "name"
                    span2.appendChild(nom)
                    

                    var span3 = document.createElement('span')
                    var date = document.createTextNode(` ${data["content"]["date"][item]} `)
                    span3.className = "time"
                    span3.appendChild(date)

                    p.appendChild(span2)
                    p.appendChild(span3)

                    div.appendChild(span1)

                    li.appendChild(i)
                    li.appendChild(div)
                    li.appendChild(p)

                    users.appendChild(li)

                    membre = membre + data["content"]["user"][item] + ','
                }
                alert("un nouveau client vient de se connecter")
                document.getElementById("membre").innerHTML = membre
                break;

            case 'nouveau_message':
                console.log(`${data['content']["sender"]} : ${data['content']["message"]}`)
                var div1 = document.createElement('div')
                div1.className = "chat-avatar"

                var div2 = document.createElement('div')
                div2.className = "chat-name"
                var txt1 = document.createTextNode(` ${data["content"]["sender"]} `)
                div2.appendChild(txt1)
                div1.appendChild(div2)

                var div3 = document.createElement('div')
                div3.className = "chat-text"
                var txt2 = document.createTextNode(` ${data["content"]["message"]} `)
                div3.appendChild(txt2)

                var div4 = document.createElement('div')
                div4.className = "chat-hour"
                var dat = new Date()
                var txt3 = document.createTextNode(` ${dat.getHours()}:${dat.getMinutes()} `)
                div4.appendChild(txt3)

                var span = document.createElement('span')
                span.className = "fa fa-check-circle"
                div4.appendChild(span)

                var li = document.createElement('li')
                if(data['content']['sender'] == sp){
                    li.className = "chat-right"
                    li.appendChild(div4)
                    li.appendChild(div3)
                    li.appendChild(div1)
                }
                else{
                    li.className = "chat-left"
                    li.appendChild(div1)
                    li.appendChild(div3)
                    li.appendChild(div4)
                }

                boxMessage.appendChild(li)
        
            default:
                break;
        }
    }

    fichier.onchange = function(event){
        alert(fichier.value)
    }

    send.onclick = function(event){
        sock.send(JSON.stringify({
            "type" : "nouveau message",
            'content' :{
                "sender" : sp,
                "message" : message.value
            }
        }))
        message.value = ""
    }


}






