import React, { useEffect } from 'react';
import { io } from 'socket.io-client';
import { useCarStore } from './store';

// eslint-disable-next-line react-refresh/only-export-components
export const socket = io("http://localhost:3001");

const SocketManager = () => {
  const { setLocalId, setCars, addCar, removeCar } = useCarStore();

  useEffect(() => {
    const onConnect = () => {
      console.log("Connected:", socket.id);
      setLocalId(socket.id);
    };

    const onDisconnect = () => {
      console.log("Disconnected");
    };

    const onCarsUpdate = (carsData) => {
      setCars(carsData);
    };

    const onUserConnected = (userId) => {
      console.log("User connected:", userId);
      addCar(userId, [26, 20, -15], [0, 0, 0, 1]);
    };

    const onUserDisconnected = (userId) => {
      console.log("User disconnected:", userId);
      removeCar(userId);
    };

    const onInit = (data) => {
      console.log("Initialization:", data);
      setLocalId(data.userId);
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("init", onInit);
    socket.on('carsUpdate', onCarsUpdate);
    socket.on('userConnected', onUserConnected);
    socket.on('userDisconnected', onUserDisconnected);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("init", onInit);
      socket.off('carsUpdate', onCarsUpdate);
      socket.off('userConnected', onUserConnected);
      socket.off('userDisconnected', onUserDisconnected);
    };
  }, [setLocalId, setCars, addCar, removeCar]);

  return null;
};

export default SocketManager;
