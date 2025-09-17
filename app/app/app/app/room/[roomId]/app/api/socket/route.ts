import { Server } from 'socket.io';
import { NextRequest } from 'next/server';
import questionBank from '@/lib/questions.json';

const rooms = new Map<string, any>();

export async function GET(req: NextRequest) {
  return new Response('Use POST to upgrade', { status: 405 });
}

export async function POST(req: NextRequest) {
  const res = new Response(null, { status: 101 });
  // @ts-ignore
  const socketServer = new Server(res.socket, { path: '/api/socket', addTrailingSlash: false });

  socketServer.on('connection', (socket) => {
    socket.on('create-room', (callback: (code: string) => void) => {
      let code = '';
      do { code = Math.random().toString().slice(2, 8); } while (rooms.has(code));
      rooms
