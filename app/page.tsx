'use client';
import { useState, useEffect } from 'react';
export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [posts, setPosts] = useState<any[]>([
    { id: 1, author: 'Alex Morgan', content: 'Halo dunia! Selamat datang di Nexty, tempat nongkrong baru kita semua.', likes: 12, comments: [] },
    { id: 2, author: 'Sarah Jenkins', content: 'Ada yang mau mabar atau ngobrol santai malam ini?', likes: 45, comments: [] }
  ]);
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  useEffect(() => {
    const savedUser = localStorage.getItem('nexty_user');
    if (savedUser) setUser(savedUser);
    const savedPosts = localStorage.getItem('nexty_posts');
    if (savedPosts) setPosts(JSON.parse(savedPosts));
  }, []);
  const handleLogin = (e: any) => {
    e.preventDefault();
    if (!usernameInput.trim()) return;
    setUser(usernameInput);
    localStorage.setItem('nexty_user', usernameInput);
  };
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nexty_user');
  };
  const saveAndSetPosts = (newPosts: any[]) => {
    setPosts(newPosts);
    localStorage.setItem('nexty_posts', JSON.stringify(newPosts));
  };
  const handlePostSubmit = (e: any) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const postObj = { id: Date.now(), author: user, content: newPost, likes: 0, comments: [] };
    saveAndSetPosts([postObj, ...posts]);
    setNewPost('');
  };
  const handleLike = (id: any) => {
    const updated = posts.map((p: any) => p.id === id ? { ...p, likes: p.likes + 1 } : p);
    saveAndSetPosts(updated);
  };
  const handleShare = (content: any) => {
    navigator.clipboard.writeText(content);
    alert('Tautan postingan berhasil disalin!');
  };
  const handleCommentSubmit = (postId: any, e: any) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    const updated = posts.map((p: any) => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, { id: Date.now(), author: user, text }] };
      }
      return p;
    });
    saveAndSetPosts(updated);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };
  if (!user) {
    return (
      <div style={{minHeight:'100vh', background:'#090d16', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'sans-serif'}}>
        <form onSubmit={handleLogin} style={{background:'#111827', padding:30, borderRadius:16, border:'1px solid #1f2937', width:320, display:'flex', flexDirection:'column', gap:15}}>
          <h1 style={{color:'#38bdf8', fontSize:26, fontWeight:'bold', textAlign:'center', margin:0}}>nexty</h1>
          <p style={{color:'#9ca3af', fontSize:13, textAlign:'center', margin:0}}>Masuk untuk mulai posting dan berinteraksi</p>
          <input type='text' placeholder='Masukkan nama/username kamu...' value={usernameInput} onChange={(e)=>setUsernameInput(e.target.value)} style={{background:'#1f2937', border:'1px solid #374151', padding:12, borderRadius:8, color:'#fff', outline:'none', fontSize:14}} />
          <button type='submit' style={{background:'#38bdf8', color:'#090d16', border:'none', padding:12, borderRadius:8, fontWeight:'bold', cursor:'pointer', fontSize:14}}>Masuk ke Nexty</button>
        </form>
      </div>
    );
  }
  return (
    <div style={{minHeight:'100vh', background:'#090d16', color:'#fff', display:'flex', flexDirection:'column', alignItems:'center', fontFamily:'sans-serif', paddingBottom:50}}>
      <header style={{width:'100%', maxWidth:500, borderBottom:'1px solid #1f2937', padding:'15px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'#090d16', zIndex:10}}>
        <h1 style={{color:'#38bdf8', fontSize:24, fontWeight:'bold', margin:0}}>nexty</h1>
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <span style={{fontSize:13, color:'#9ca3af'}}>@{user}</span>
          <button onClick={handleLogout} style={{background:'#ef4444', color:'#fff', border:'none', padding:'6px 12px', borderRadius:6, fontSize:12, cursor:'pointer', fontWeight:'bold'}}>Keluar</button>
        </div>
      </header>
      <main style={{width:'100%', maxWidth:500, padding:20, display:'flex', flexDirection:'column', gap:15}}>
        <form onSubmit={handlePostSubmit} style={{background:'#111827', padding:15, borderRadius:12, border:'1px solid #1f2937', display:'flex', flexDirection:'column', gap:10}}>
          <textarea rows={3} value={newPost} onChange={(e)=>setNewPost(e.target.value)} placeholder='Ada apa di pikiranmu hari ini?' style={{background:'transparent', border:'none', color:'#fff', resize:'none', outline:'none', fontSize:14}} />
          <div style={{display:'flex', justifyContent:'flex-end', borderTop:'1px solid #1f2937', paddingTop:10}}>
            <button type='submit' style={{background:'#38bdf8', color:'#090d16', border:'none', padding:'8px 16px', borderRadius:20, fontWeight:'bold', cursor:'pointer', fontSize:13}}>Kirim Post</button>
          </div>
        </form>
        {posts.map((post: any) => (
          <div key={post.id} style={{background:'#111827', padding:16, borderRadius:12, border:'1px solid #1f2937', display:'flex', flexDirection:'column', gap:10}}>
            <h3 style={{margin:0, fontSize:15, color:'#f3f4f6'}}>{post.author}</h3>
            <p style={{color:'#9ca3af', fontSize:14, margin:0}}>{post.content}</p>
            <div style={{display:'flex', gap:20, borderTop:'1px solid #1f2937', paddingTop:10, fontSize:13}}>
              <span onClick={() => handleLike(post.id)} style={{color:'#38bdf8', cursor:'pointer'}}>?? {post.likes} Suka</span>
              <span onClick={() => handleShare(post.content)} style={{color:'#9ca3af', cursor:'pointer'}}>?? Bagikan</span>
            </div>
            <div style={{display:'flex', flexDirection:'column', gap:8, marginTop:5}}>
              {post.comments.map((c: any) => (
                <div key={c.id} style={{background:'#1f2937', padding:'6px 10px', borderRadius:8, fontSize:12}}>
                  <strong style={{color:'#e5e7eb'}}>{c.author}: </strong><span style={{color:'#9ca3af'}}>{c.text}</span>
                </div>
              ))}
              <form onSubmit={(e)=>handleCommentSubmit(post.id, e)} style={{display:'flex', gap:6, marginTop:4}}>
                <input type='text' placeholder='Tulis komentar...' value={commentInputs[post.id] || ''} onChange={(e)=>setCommentInputs({...commentInputs, [post.id]: e.target.value})} style={{flex:1, background:'#1f2937', border:'1px solid #374151', padding:'6px 10px', borderRadius:6, color:'#fff', outline:'none', fontSize:12}} />
                <button type='submit' style={{background:'#38bdf8', color:'#090d16', border:'none', padding:'6px 10px', borderRadius:6, fontWeight:'bold', cursor:'pointer', fontSize:12}}>Balas</button>
              </form>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}
