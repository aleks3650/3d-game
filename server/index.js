import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
})

io.listen(3001)

const users = []

io.on('connection', (socket) => {
    console.log('user connected')

    users.push({
        id: socket.id,
    })
    socket.emit("hello")

    socket.on("disconnect", () => {
        console.log("user disconnected")
        users.splice(
            users.findIndex((user) => user.id === socket.id), 1
        )
        io.emit("users: ", users)
    })
})