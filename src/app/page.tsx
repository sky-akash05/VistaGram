'use client'; // 👈 Add this at the top

import { useState, useEffect } from 'react';
import UploadForm from '@/components/UploadForm';
import PostCard from '@/components/PostCard';

export default function Home() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data.posts);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="space-y-6">
      <UploadForm onCreated={fetchPosts} />
      <section className="space-y-4">
        {posts.length === 0 && (
          <div className="card p-6 text-center text-sm text-gray-500">No posts yet. Be the first!</div>
        )}
        {posts.map((p: any) => (
          <PostCard key={p.id} post={p} />
        ))}
      </section>
    </div>
  );
}
