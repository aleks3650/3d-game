import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "http://localhost:5173"
    }
});

io.listen(3001);

let cars = {};

setInterval(() => {
    console.log('Active cars:', Object.keys(cars).length);
}, 5000);

io.on('connection', (socket) => {
    const userId = socket.id;
    console.log('User connected:', userId);

    cars[userId] = {
        position: [26, 20, -15],
        rotation: [0, 0, 0, 1]
    };

    socket.emit('carsUpdate', cars);
    
    socket.broadcast.emit('userConnected', userId);
    socket.broadcast.emit('carsUpdate', cars);

    socket.on('carUpdate', (data) => {
        if (cars[userId]) {
            cars[userId] = {
                position: data.position,
                rotation: data.rotation
            };
            socket.broadcast.emit('carsUpdate', cars);
        }
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', userId);
        delete cars[userId];
        
        socket.broadcast.emit('userDisconnected', userId);
        socket.broadcast.emit('carsUpdate', cars);
    });
});