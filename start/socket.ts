import { faker } from "@faker-js/faker";
import { createServer } from "http";
import { Server } from 'socket.io';
/*
|--------------------------------------------------------------------------
| Preloaded File
|--------------------------------------------------------------------------
|
| Any code written inside this file will be executed during the application
| boot.
|
*/

const server = createServer()
const io = new Server(server, {
  cors: {
    origin: 'http://localhost'
  }
})

io.on('connection', (socket) => { //quando si collega un client
  socket.data.name = faker.person.fullName()
  io.emit('new/user', socket.data.name) // emetto un evento per gli utenti che si connettono
  socket.on('message/send', (data) => { // ascolto l'evento 'message/send'
    io.emit('message/recive', { // il server manda il messaggio a tutti i client connessi
      name: socket.data.name,
      message: data
    })
  })

  socket.on('disconnect', () => { // quando un client si disconnette
    io.emit('leave/user', socket.data.name)
  })

})

server.listen(3000)
