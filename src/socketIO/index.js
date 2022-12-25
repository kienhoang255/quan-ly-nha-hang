import { io } from 'socket.io-client';

const socket = io('ws://localhost:8000');

export const postTable = (data) => socket.emit('table', data);

export const postBill = (data) => socket.emit('bill', data);

export const postFoodOrdered = (data) => socket.emit('foodOrdered', data);

export const postFoodServed = (data) => socket.emit('foodServed', data);
export const postFoodCancel = (data) => socket.emit('foodCancel', data);
