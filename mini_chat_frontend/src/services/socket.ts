// import { io, Socket } from 'socket.io-client';

// // يمكنك تعريف نوع للأحداث (اختياري لتحسين TypeScript)
// interface ServerToClientEvents {
//   message: (data: string) => void;
// }

// interface ClientToServerEvents {
//   message: (data: string) => void;
// }

// const SOCKET_URL = 'http://localhost:3000'; // عدّله حسب سيرفرك

// const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SOCKET_URL, {
//   transports: ['websocket'], // يفضل تحديد البروتوكول
// });

// export default socket;
