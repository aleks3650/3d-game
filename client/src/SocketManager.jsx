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

    const onCarsUpdate = (carsData) => {
      console.log("Cars update received:", carsData);
      setCars(carsData);
    };

    const onUserConnected = (userId) => {
      console.log("User connected:", userId);
    };

    const onUserDisconnected = (userId) => {
      console.log("User disconnected:", userId);
      removeCar(userId);
    };

    
    socket.on("connect", onConnect);
    socket.on('carsUpdate', onCarsUpdate);
    socket.on('userConnected', onUserConnected);
    socket.on('userDisconnected', onUserDisconnected);

    return () => {
      socket.off("connect", onConnect);
      socket.off('carsUpdate', onCarsUpdate);
      socket.off('userConnected', onUserConnected);
      socket.off('userDisconnected', onUserDisconnected);
    };
  }, [setLocalId, setCars, addCar, removeCar]);

  return null;
};

export default SocketManager;