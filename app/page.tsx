'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [user, setUser] = useState<string | null>(null);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const [posts, setPosts] = useState<any[]>([
    { 
      id: 1, 
      author: 'Alex Morgan', 
      content: 'Halo dunia! Selamat datang di Nexty, platform media sosial masa kini. ??', 
      likes: 12, 
      likedBy: [], 
      dislikes: 0,
      dislikedBy: [],
      comments: [
        { id: 101, author: 'Sarah Jenkins', text: 'Keren banget tampilannya!', likes: 3, likedBy: [], replies: [] }
      ] 
    },
    { 
      id: 2, 
      author: 'Sarah Jenkins', 
      content: 'Ada yang mau mabar atau ngobrol santai malam ini?', 
      likes: 45, 
      likedBy: [], 
      dislikes: 1,
      dislikedBy: [],
      comments: [] 
    }
  ]);

  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});
  const [replyInputs, setReplyInputs] = useState<Record<number, string>>({});
  const [activeReplyBox, setActiveReplyBox] = useState<number | null>(null);

  useEffect(() => {
    // Reset margin & padding body agar tidak ada garis putih di pinggir site
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.body.style.backgroundColor = '#090d16';
    document.body.style.fontFamily = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';

    const savedUser = localStorage.getItem('nexty_current_user');
    if (savedUser) setUser(savedUser);
    const savedPosts = localStorage.getItem('nexty_posts');
    if (savedPosts) setPosts(JSON.parse(savedPosts));
  }, []);

  const handleSignup = (e: any) => {
    e.preventDefault();
    setErrorMsg('');
    if (!signupUsername.trim() || !signupPassword.trim()) {
      setErrorMsg('Username dan password wajib diisi!');
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('nexty_registered_users') || '{}');
    if (existingUsers[signupUsername]) {
      setErrorMsg('Username sudah terdaftar!');
      return;
    }
    existingUsers[signupUsername] = signupPassword;
    localStorage.setItem('nexty_registered_users', JSON.stringify(existingUsers));
    setUser(signupUsername);
    localStorage.setItem('nexty_current_user', signupUsername);
  };

  const handleLogin = (e: any) => {
    e.preventDefault();
    setErrorMsg('');
    if (!usernameInput.trim() || !passwordInput.trim()) {
      setErrorMsg('Username dan password wajib diisi!');
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem('nexty_registered_users') || '{}');
    if (usernameInput === 'admin' && passwordInput === 'admin') {
      setUser(usernameInput);
      localStorage.setItem('nexty_current_user', usernameInput);
      return;
    }
    if (!existingUsers[usernameInput] || existingUsers[usernameInput] !== passwordInput) {
      setErrorMsg('Username atau password salah!');
      return;
    }
    setUser(usernameInput);
    localStorage.setItem('nexty_current_user', usernameInput);
  };

  const handleGoogleAuth = () => {
    const googleNames = ['Amar Maulana Rizq', 'Google User', 'Nexty Member'];
    const randomName = googleNames[Math.floor(Math.random() * googleNames.length)];
    setUser(randomName);
    localStorage.setItem('nexty_current_user', randomName);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('nexty_current_user');
  };

  const saveAndSetPosts = (newPosts: any[]) => {
    setPosts(newPosts);
    localStorage.setItem('nexty_posts', JSON.stringify(newPosts));
  };

  const handlePostSubmit = (e: any) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    const postObj = { 
      id: Date.now(), 
      author: user, 
      content: newPost, 
      likes: 0, 
      likedBy: [], 
      dislikes: 0,
      dislikedBy: [],
      comments: [] 
    };
    saveAndSetPosts([postObj, ...posts]);
    setNewPost('');
  };

  // Like & Dislike Post (Toggle 1 kali, merah jika dilike)
  const handleLikePost = (postId: number) => {
    const updated = posts.map((p: any) => {
      if (p.id === postId) {
        const likedBy = p.likedBy || [];
        const dislikedBy = p.dislikedBy || [];
        let likes = p.likes;
        let dislikes = p.dislikes;

        if (likedBy.includes(user)) {
          // Batalkan like jika diklik lagi
          return { ...p, likes: likes - 1, likedBy: likedBy.filter((u: string) => u !== user) };
        } else {
          // Jika sebelumnya dislike, hapus dislike dulu
          let newDislikedBy = dislikedBy;
          if (dislikedBy.includes(user)) {
            dislikes -= 1;
            newDislikedBy = dislikedBy.filter((u: string) => u !== user);
          }
          return { ...p, likes: likes + 1, likedBy: [...likedBy, user], dislikes, dislikedBy: newDislikedBy };
        }
      }
      return p;
    });
    saveAndSetPosts(updated);
  };

  const handleDislikePost = (postId: number) => {
    const updated = posts.map((p: any) => {
      if (p.id === postId) {
        const likedBy = p.likedBy || [];
        const dislikedBy = p.dislikedBy || [];
        let likes = p.likes;
        let dislikes = p.dislikes;

        if (dislikedBy.includes(user)) {
          return { ...p, dislikes: dislikes - 1, dislikedBy: dislikedBy.filter((u: string) => u !== user) };
        } else {
          let newLikedBy = likedBy;
          if (likedBy.includes(user)) {
            likes -= 1;
            newLikedBy = likedBy.filter((u: string) => u !== user);
          }
          return { ...p, dislikes: dislikes + 1, dislikedBy: [...dislikedBy, user], likes, likedBy: newLikedBy };
        }
      }
      return p;
    });
    saveAndSetPosts(updated);
  };

  const handleShare = (content: string) => {
    navigator.clipboard.writeText(content);
    alert('Tautan postingan berhasil disalin ke clipboard!');
  };

  // Komentar Postingan
  const handleCommentSubmit = (postId: number, e: any) => {
    e.preventDefault();
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;
    const updated = posts.map((p: any) => {
      if (p.id === postId) {
        const newComment = { id: Date.now(), author: user, text, likes: 0, likedBy: [], replies: [] };
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    });
    saveAndSetPosts(updated);
    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  // Like Komentar
  const handleLikeComment = (postId: number, commentId: number) => {
    const updated = posts.map((p: any) => {
      if (p.id === postId) {
        const updatedComments = p.comments.map((c: any) => {
          if (c.id === commentId) {
            const likedBy = c.likedBy || [];
            if (likedBy.includes(user)) {
              return { ...c, likes: c.likes - 1, likedBy: likedBy.filter((u: string) => u !== user) };
            } else {
              return { ...c, likes: c.likes + 1, likedBy: [...likedBy, user] };
            }
          }
          return c;
        });
        return { ...p, comments: updatedComments };
      }
      return p;
    });
    saveAndSetPosts(updated);
  };

  // Balas Komentar (Reply)
  const handleReplySubmit = (postId: number, commentId: number, e: any) => {
    e.preventDefault();
    const text = replyInputs[commentId];
    if (!text || !text.trim()) return;
    const updated = posts.map((p: any) => {
      if (p.id === postId) {
        const updatedComments = p.comments.map((c: any) => {
          if (c.id === commentId) {
            const replies = c.replies || [];
            const newReply = { id: Date.now(), author: user, text };
            return { ...c, replies: [...replies, newReply] };
          }
          return c;
        });
        return { ...p, comments: updatedComments };
      }
      return p;
    });
    saveAndSetPosts(updated);
    setReplyInputs({ ...replyInputs, [commentId]: '' });
    setActiveReplyBox(null);
  };

  if (!user) {
    return (
      <div style={{minHeight:'100vh', width:'100vw', background:'#090d16', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', margin:0, padding:20, boxSizing:'border-box'}}>
        <div style={{background:'#111827', padding:30, borderRadius:16, border:'1px solid #1f2937', width:360, display:'flex', flexDirection:'column', gap:15}}>
          <h1 style={{color:'#38bdf8', fontSize:28, fontWeight:'bold', textAlign:'center', margin:0}}>nexty</h1>
          <p style={{color:'#9ca3af', fontSize:13, textAlign:'center', margin:0}}>
            {authMode === 'login' ? 'Masuk ke akun Nexty kamu' : 'Daftar akun baru ke platform Nexty'}
          </p>

          {errorMsg && (
            <div style={{background:'#7f1d1d', color:'#fca5a5', padding:'8px 12px', borderRadius:8, fontSize:12, textAlign:'center'}}>
              {errorMsg}
            </div>
          )}

          <div style={{display:'flex', background:'#1f2937', borderRadius:8, padding:4}}>
            <button 
              type="button" 
              onClick={() => { setAuthMode('login'); setErrorMsg(''); }}
              style={{flex:1, background: authMode === 'login' ? '#38bdf8' : 'transparent', color: authMode === 'login' ? '#090d16' : '#9ca3af', border:'none', padding:'8px', borderRadius:6, fontWeight:'bold', cursor:'pointer', fontSize:13}}
            >
              Log In
            </button>
            <button 
              type="button" 
              onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
              style={{flex:1, background: authMode === 'signup' ? '#38bdf8' : 'transparent', color: authMode === 'signup' ? '#090d16' : '#9ca3af', border:'none', padding:'8px', borderRadius:6, fontWeight:'bold', cursor:'pointer', fontSize:13}}
            >
              Sign Up
            </button>
          </div>

          {authMode === 'login' ? (
            <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', gap:12}}>
              <input type="text" placeholder="Username" value={usernameInput} onChange={(e)=>setUsernameInput(e.target.value)} style={{background:'#1f2937', border:'1px solid #374151', padding:12, borderRadius:8, color:'#fff', outline:'none', fontSize:14}} />
              <input type="password" placeholder="Password" value={passwordInput} onChange={(e)=>setPasswordInput(e.target.value)} style={{background:'#1f2937', border:'1px solid #374151', padding:12, borderRadius:8, color:'#fff', outline:'none', fontSize:14}} />
              <button type="submit" style={{background:'#38bdf8', color:'#090d16', border:'none', padding:12, borderRadius:8, fontWeight:'bold', cursor:'pointer', fontSize:14, marginTop:4}}>Log In</button>
            </form>
          ) : (
            <form onSubmit={handleSignup} style={{display:'flex', flexDirection:'column', gap:12}}>
              <input type="text" placeholder="Buat Username Baru" value={signupUsername} onChange={(e)=>setSignupUsername(e.target.value)} style={{background:'#1f2937', border:'1px solid #374151', padding:12, borderRadius:8, color:'#fff', outline:'none', fontSize:14}} />
              <input type="password" placeholder="Buat Password" value={signupPassword} onChange={(e)=>setSignupPassword(e.target.value)} style={{background:'#1f2937', border:'1px solid #374151', padding:12, borderRadius:8, color:'#fff', outline:'none', fontSize:14}} />
              <button type="submit" style={{background:'#10b981', color:'#fff', border:'none', padding:12, borderRadius:8, fontWeight:'bold', cursor:'pointer', fontSize:14, marginTop:4}}>Daftar & Buat Akun Nexty</button>
            </form>
          )}

          <div style={{display:'flex', alignItems:'center', gap:10, margin:'5px 0'}}>
            <div style={{flex:1, height:1, background:'#374151'}}></div>
            <span style={{fontSize:12, color:'#6b7280'}}>ATAU</span>
            <div style={{flex:1, height:1, background:'#374151'}}></div>
          </div>

          <button 
            type="button" 
            onClick={handleGoogleAuth} 
            style={{background:'#fff', color:'#1f2937', border:'none', padding:12, borderRadius:8, fontWeight:'bold', cursor:'pointer', fontSize:14, display:'flex', alignItems:'center', justifyContent:'center', gap:10}}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.17 21.37 7.23 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.12 0 9.87 0 12s.43 3.88 1.19 5.42l4.09-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.17 2.63 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            Lanjutkan dengan Google
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{minHeight:'100vh', width:'100vw', background:'#090d16', color:'#fff', display:'flex', flexDirection:'column', alignItems:'center', margin:0, padding:0, boxSizing:'border-box', paddingBottom:50}}>
      <header style={{width:'100%', maxWidth:500, borderBottom:'1px solid #1f2937', padding:'15px 20px', display:'flex', justifyContent:'space-between', alignItems:'center', position:'sticky', top:0, background:'#090d16', zIndex:10, boxSizing:'border-box'}}>
        <h1 style={{color:'#38bdf8', fontSize:24, fontWeight:'bold', margin:0}}>nexty</h1>
        <div style={{display:'flex', gap:10, alignItems:'center'}}>
          <span style={{fontSize:13, color:'#9ca3af'}}>@{user}</span>
          <button onClick={handleLogout} style={{background:'#ef4444', color:'#fff', border:'none', padding:'6px 12px', borderRadius:6, fontSize:12, cursor:'pointer', fontWeight:'bold'}}>Keluar</button>
        </div>
      </header>

      <main style={{width:'100%', maxWidth:500, padding:20, display:'flex', flexDirection:'column', gap:15, boxSizing:'border-box'}}>
        {/* Form Buat Postingan */}
        <form onSubmit={handlePostSubmit} style={{background:'#111827', padding:15, borderRadius:12, border:'1px solid #1f2937', display:'flex', flexDirection:'column', gap:10}}>
          <textarea rows={3} value={newPost} onChange={(e)=>setNewPost(e.target.value)} placeholder="Ada apa di pikiranmu hari ini?" style={{background:'transparent', border:'none', color:'#fff', resize:'none', outline:'none', fontSize:14}} />
          <div style={{display:'flex', justifyContent:'flex-end', borderTop:'1px solid #1f2937', paddingTop:10}}>
            <button type="submit" style={{background:'#38bdf8', color:'#090d16', border:'none', padding:'8px 16px', borderRadius:20, fontWeight:'bold', cursor:'pointer', fontSize:13}}>Kirim Post</button>
          </div>
        </form>

        {/* Daftar Feed Postingan */}
        {posts.map((post: any) => {
          const isLiked = post.likedBy && post.likedBy.includes(user);
          const isDisliked = post.dislikedBy && post.dislikedBy.includes(user);

          return (
            <div key={post.id} style={{background:'#111827', padding:16, borderRadius:12, border:'1px solid #1f2937', display:'flex', flexDirection:'column', gap:10}}>
              <h3 style={{margin:0, fontSize:15, color:'#f3f4f6'}}>{post.author}</h3>
              <p style={{color:'#9ca3af', fontSize:14, margin:0}}>{post.content}</p>
              
              {/* Tombol Interaksi Postingan (Like Love Kosong/Merah, Dislike, Pesawat Threads) */}
              <div style={{display:'flex', alignItems:'center', gap:20, borderTop:'1px solid #1f2937', paddingTop:10, fontSize:13}}>
                {/* Like Love */}
                <span 
                  onClick={() => handleLikePost(post.id)} 
                  style={{color: isLiked ? '#ef4444' : '#9ca3af', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontWeight: isLiked ? 'bold' : 'normal'}}
                >
                  {isLiked ? '??' : '??'} {post.likes} Suka
                </span>

                {/* Dislike */}
                <span 
                  onClick={() => handleDislikePost(post.id)} 
                  style={{color: isDisliked ? '#38bdf8' : '#9ca3af', cursor:'pointer', display:'flex', alignItems:'center', gap:6}}
                >
                  ?? {post.dislikes} Dislike
                </span>

                {/* Bagikan Logo Pesawat Threads */}
                <span 
                  onClick={() => handleShare(post.content)} 
                  style={{color:'#9ca3af', cursor:'pointer', display:'flex', alignItems:'center', gap:6, marginLeft:'auto'}}
                  title="Bagikan (Threads Style)"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="22" y1="2" x2="11" y2="13"></line>
                    polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                  </svg>
                </span>
              </div>

              {/* Kolom Komentar */}
              <div style={{display:'flex', flexDirection:'column', gap:10, marginTop:8, borderTop:'1px solid #1f2937', paddingTop:10}}>
                {post.comments.map((c: any) => {
                  const isCommentLiked = c.likedBy && c.likedBy.includes(user);
                  return (
                    <div key={c.id} style={{background:'#1f2937', padding:10, borderRadius:8, fontSize:12, display:'flex', flexDirection:'column', gap:6}}>
                      <div style={{display:'flex', justifyContent:'space-between'}}>
                        <strong style={{color:'#e5e7eb'}}>{c.author}</strong>
                        <span 
                          onClick={() => handleLikeComment(post.id, c.id)} 
                          style={{color: isCommentLiked ? '#ef4444' : '#9ca3af', cursor:'pointer'}}
                        >
                          {isCommentLiked ? '??' : '??'} {c.likes}
                        </span>
                      </div>
                      <span style={{color:'#9ca3af'}}>{c.text}</span>

                      {/* Balasan Komentar (Replies) */}
                      {c.replies && c.replies.map((r: any) => (
                        <div key={r.id} style={{background:'#111827', padding:6, borderRadius:6, marginLeft:15, marginTop:4}}>
                          <strong style={{color:'#38bdf8'}}>{r.author}: </strong>
                          <span style={{color:'#9ca3af'}}>{r.text}</span>
                        </div>
                      ))}

                      {/* Tombol Balas Komentar */}
                      <span 
                        onClick={() => setActiveReplyBox(activeReplyBox === c.id ? null : c.id)} 
                        style={{color:'#38bdf8', cursor:'pointer', fontSize:11, width:'fit-content'}}
                      >
                        Balas
                      </span>

                      {activeReplyBox === c.id && (
                        <form onSubmit={(e) => handleReplySubmit(post.id, c.id, e)} style={{display:'flex', gap:6, marginTop:4}}>
                          <input 
                            type="text" 
                            placeholder="Tulis balasan..." 
                            value={replyInputs[c.id] || ''} 
                            onChange={(e)=>setReplyInputs({...replyInputs, [c.id]: e.target.value})} 
                            style={{flex:1, background:'#111827', border:'1px solid #374151', padding:'4px 8px', borderRadius:4, color:'#fff', outline:'none', fontSize:11}} 
                          />
                          <button type="submit" style={{background:'#38bdf8', color:'#090d16', border:'none', padding:'4px 8px', borderRadius:4, fontWeight:'bold', cursor:'pointer', fontSize:11}}>Kirim</button>
                        </form>
                      )}
                    </div>
                  );
                })}

                {/* Form Tambah Komentar */}
                <form onSubmit={(e)=>handleCommentSubmit(post.id, e)} style={{display:'flex', gap:6, marginTop:4}}>
                  <input 
                    type="text" 
                    placeholder="Tulis komentar..." 
                    value={commentInputs[post.id] || ''} 
                    onChange={(e)=>setCommentInputs({...commentInputs, [post.id]: e.target.value})} 
                    style={{flex:1, background:'#1f2937', border:'1px solid #374151', padding:'8px 10px', borderRadius:6, color:'#fff', outline:'none', fontSize:12}} 
                  />
                  <button type="submit" style={{background:'#38bdf8', color:'#090d16', border:'none', padding:'8px 12px', borderRadius:6, fontWeight:'bold', cursor:'pointer', fontSize:12}}>Kirim</button>
                </form>
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
