'use client';
import { useState } from 'react';
  const [posts, setPosts] = useState([
    { id: 1, author: 'Alex Morgan', username: '@alexm', content: 'Halo dunia! Selamat datang di Nexty, tempat nongkrong baru kita semua. ??', time: '2m lalu', likes: 12 },
    { id: 2, author: 'Sarah Jenkins', username: '@sarahj', content: 'Ada yang mau mabar atau ngobrol santai malam ini? Seru banget platform secepat ini!', time: '15m lalu', likes: 45 },
  const handlePostSubmit = (e: React.FormEvent
  };
  const handleLike = (id: number
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center">
      <header className="w-full max-w-xl border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 bg-slate-950/80 backdrop-blur-md z-10">
        <h1 className="text-2xl font-black tracking-wider text-sky-400">nexty</h1>
        <span className="text-xs bg-sky-950 text-sky-300 px-3 py-1 rounded-full border border-sky-800">Alpha v1.0</span>
      </header>
      <main className="w-full max-w-xl p-4 flex flex-col gap-4 pb-20">
        <form onSubmit={handlePostSubmit} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-3 shadow-lg">
          <div className="flex justify-between items-center border-t border-slate-800/60 pt-3">
            <span className="text-xs text-slate-500">Bagikan ke publik</span>
            <button type="submit" className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold px-4 py-1.5 rounded-full text-sm transition">Kirim Post</button>
          </div>
        </form>
        <div className="flex flex-col gap-3">
          {posts.map((post
            <div key={post.id} className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div>
                    <h2 className="text-sm font-bold text-slate-200">{post.author}</h2>
                    <p className="text-xs text-slate-500">{post.username}</p>
                  </div>
                </div>
                <span className="text-xs text-slate-500">{post.time}</span>
              </div>
              <p className="text-sm text-slate-300 mt-1">{post.content}</p>
              <div className="flex gap-6 mt-3 pt-3 border-t border-slate-800/40 text-xs text-slate-400">
              </div>
            </div>
        </div>
      </main>
    </div>
}
