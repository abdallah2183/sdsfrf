'use client';
import { useState } from 'react';
import CreateRoom from '@/components/CreateRoom';
import JoinRoom from '@/components/JoinRoom';

export default function Home() {
  const [view, setView] = useState<'home' | 'create' | 'join'>('home');

  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-900 to-slate-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl md:text-6xl font-extrabold mb-2">كويز بلس</h1>
      <p className="mb-10 text-lg">غرفة معلومات عامة بصور – اختبر معرفتك مع أصدقائك!</p>

      {view === 'home' && (
        <div className="flex gap-4">
          <button onClick={() => setView('create')} className="btn-primary">إنشاء غرفة</button>
          <button onClick={() => setView('join')} className="btn-primary">انضمام لغرفة</button>
        </div>
      )}

      {view === 'create' && <CreateRoom onBack={() => setView('home')} />}
      {view === 'join' && <JoinRoom onBack={() => setView('home')} />}
    </main>
  );
}
