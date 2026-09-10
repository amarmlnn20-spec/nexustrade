'use client';
import { useState, useEffect } from 'react';
  const [user, setUser] = useState(null);
  const [usernameInput, setUsernameInput] = useState('');
  const [posts, setPosts] = useState([
    { id: 1, author: 'Alex Morgan', content: 'Halo dunia! Selamat datang di Nexty, tempat nongkrong baru kita semua.', likes: 12, comments: [] },
    { id: 2, author: 'Sarah Jenkins', content: 'Ada yang mau mabar atau ngobrol santai malam ini?', likes: 45, comments: [] }]
  const [newPost, setNewPost] = useState('');
  const [commentInputs, setCommentInputs] = useState({});
  };
  };
  };
  };
  };
  };
    const text = commentInputs[postId];
    const updated = posts.map(p => {
      }
      return p;
  };
    return (
      <div style={{minHeight:"100vh", background:"#090d16", color:"#fff", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"sans-serif"}}>
        <form onSubmit={handleLogin} style={{background:"#111827", padding:30, borderRadius:16, border:"1px solid #1f2937", width:320, display:"flex", flexDirection:"column", gap:15}}>
          <h1 style={{color:"#38bdf8", fontSize:26, fontWeight:"bold", textAlign:"center", margin:0}}>nexty</h1>
          <p style={{color:"#9ca3af", fontSize:13, textAlign:"center", margin:0}}>Masuk untuk mulai posting dan berinteraksi</p>
          <button type="submit" style={{background:"#38bdf8", color:"#090d16", border:"none", padding:12, borderRadius:8, fontWeight:"bold", cursor:"pointer", fontSize:14}}>Masuk ke Nexty</button>
        </form>
      </div>
  }
  return (
    <div style={{minHeight:"100vh", background:"#090d16", color:"#fff", display:"flex", flexDirection:"column", alignItems:"center", fontFamily:"sans-serif", paddingBottom:50}}>
      <header style={{width:"100%", maxWidth:500, borderBottom:"1px solid #1f2937", padding:"15px 20px", display:"flex", justifyContent:"space-between", alignItems:"center", position:"sticky", top:0, background:"#090d16", zIndex:10}}>
        <h1 style={{color:"#38bdf8", fontSize:24, fontWeight:"bold", margin:0}}>nexty</h1>
        <div style={{display:"flex", gap:10, alignItems:"center"}}>
          <span style={{fontSize:13, color:"#9ca3af"}}>@{user}</span>
          <button onClick={handleLogout} style={{background:"#ef4444", color:"#fff", border:"none", padding:"6px 12px", borderRadius:6, fontSize:12, cursor:"pointer", fontWeight:"bold"}}>Keluar</button>
        </div>
      </header>
      <main style={{width:"100%", maxWidth:500, padding:20, display:"flex", flexDirection:"column", gap:15}}>
        <form onSubmit={handlePostSubmit} style={{background:"#111827", padding:15, borderRadius:12, border:"1px solid #1f2937", display:"flex", flexDirection:"column", gap:10}}>
          <div style={{display:"flex", justifyContent:"flex-end", borderTop:"1px solid #1f2937", paddingTop:10}}>
            <button type="submit" style={{background:"#38bdf8", color:"#090d16", border:"none", padding:"8px 16px", borderRadius:20, fontWeight:"bold", cursor:"pointer", fontSize:13}}>Kirim Post</button>
          </div>
        </form>
        {posts.map(post => (
          <div key={post.id} style={{background:"#111827", padding:16, borderRadius:12, border:"1px solid #1f2937", display:"flex", flexDirection:"column", gap:10}}>
            <h3 style={{margin:0, fontSize:15, color:"#f3f4f6"}}>{post.author}</h3>
            <p style={{color:"#9ca3af", fontSize:14, margin:0}}>{post.content}</p>
            <div style={{display:"flex", gap:20, borderTop:"1px solid #1f2937", paddingTop:10, fontSize:13}}>
            </div>
            <div style={{display:"flex", flexDirection:"column", gap:8, marginTop:5}}>
              {post.comments.map(c => (
                <div key={c.id} style={{background:"#1f2937", padding:"6px 10px", borderRadius:8, fontSize:12}}>
                  <strong style={{color:"#e5e7eb"}}>{c.author}: </strong><span style={{color:"#9ca3af"}}>{c.text}</span>
                </div>
                <button type="submit" style={{background:"#38bdf8", color:"#090d16", border:"none", padding:"6px 10px", borderRadius:6, fontWeight:"bold", cursor:"pointer", fontSize:12}}>Balas</button>
              </form>
            </div>
          </div>
      </main>
    </div>
}
