import socketIo from 'socket.io'

export default function SocketIo() {
  const io = socketIo()

  // Place any additional initialization code here

  return io
}
