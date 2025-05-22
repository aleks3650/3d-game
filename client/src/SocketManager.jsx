import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'

// eslint-disable-next-line react-refresh/only-export-components
export const socket = io("http://localhost:3001")

const SocketManager = () => {
    const [_users, setUsers] = useState([])
    useEffect(() => {
        function onConnect() {
            console.log("connected")
        }
        function onDisconnect() {
            console.log("disconnected")
        }
        function onHello() {
            console.log("hello")
        }
        function onUsers(value) {
            setUsers(value)
        }

        socket.on("connect", onConnect)
        socket.on("disconnect", onDisconnect);
        socket.on("hello", onHello);
        socket.on("characters", onUsers);
        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("hello", onHello);
            socket.off("characters", onUsers);
        };
    }, [])

    return (null
    )
}

export default SocketManager