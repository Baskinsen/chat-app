import io from 'socket.io-client';



export default defineNuxtPlugin((nuxtApp)=> {
 const socket = io("/");
 console.log(socket)
 return {
   provide: {
     io: socket,
   },
 };
})