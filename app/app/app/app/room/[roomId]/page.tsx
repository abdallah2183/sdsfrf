'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSocket } from '@/lib/socket-client';
import QuestionCard from '@/components/QuestionCard';
import PlayersList from '@/components/PlayersList';
import LeaderBoard from '@/components/LeaderBoard';
import GameOver from '@/components/GameOver';

export default function RoomPage() {
  const { roomId } = useParams() as { roomId: string };
  const [players, setPlayers] = useState<{ id: string; name: string }[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [myId, setMyId] = useState<string>('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    setMyId(socket.id || '');
    socket.emit('next-question', roomId);

    socket.on('players-update', (list: any[]) => setPlayers(list));
    socket.on('question', (q: any) => setQuestion(q));
    socket.on('scores', (s: Record<string, number>) => setScores(s));
    socket.on('game-over', () => setGameOver(true));

    return () => {
      socket.off('players-update');
      socket.off('question');
      socket.off('scores');
      socket.off('game-over');
    };
  }, [roomId]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-900 to-slate-900 text-white p-4">
      {gameOver && <GameOver players={players} scores={scores} />}
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1">
          <PlayersList players={players} scores={scores} myId={myId} />
        </aside>
        <section className="lg:col-span-2">
          {question ? (
            <QuestionCard roomId={roomId} question={question} />
          ) : (
            <div className="text-center mt-20">جاري تحميل السؤال...</div>
          )}
        </section>
      </div>
      <LeaderBoard players={players} scores={scores} />
    </main>
  );
}
