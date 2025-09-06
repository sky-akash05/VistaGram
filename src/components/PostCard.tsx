'use client';
import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';

export type Post = {
  id: string;
  username: string;
  imageUrl: string;
  caption: string;
  createdAt: string;
  likes: number;
  shares: number;
};

export default function PostCard({ post: initial }: { post: Post }) {
  const [post, setPost] = useState<Post>(initial);
  const [imgLoaded, setImgLoaded] = useState(false);
  const storageKey = useMemo(() => `vistagram_like_${post.id}`, [post.id]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(localStorage.getItem(storageKey) === '1');
  }, [storageKey]);

  const toggleLike = useCallback(async () => {
    const op = liked ? 'unlike' : 'like';
    const res = await fetch(`/api/posts/${post.id}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ op })
    });
    if (res.ok) {
      const j = await res.json();
      setPost(j.post);
      const nowLiked = !liked;
      setLiked(nowLiked);
      localStorage.setItem(storageKey, nowLiked ? '1' : '0');
    }
  }, [liked, post.id, storageKey]);

  const sharePost = useCallback(async () => {
    const res = await fetch(`/api/posts/${post.id}/share`, { method: 'POST' });
    if (!res.ok) return;
    const { shareUrl, post: updated } = await res.json();
    setPost(updated);

    if (navigator.share) {
      try { await navigator.share({ title: 'Vistagram', text: post.caption, url: shareUrl }); } catch {}
    } else {
      await navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard');
    }
  }, [post.caption, post.id]);

  const when = new Date(post.createdAt).toLocaleString();

  return (
    <article className="card overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="font-semibold">@{post.username}</div>
        <div className="count">{when}</div>
      </div>

      {/* Image with skeleton shimmer */}
      <div className={`relative w-full aspect-[4/3] ${imgLoaded ? '' : 'skeleton'}`}>
        <Image
          src={post.imageUrl}
          alt={post.caption}
          fill
          sizes="(max-width: 768px) 100vw, 640px"
          className={`object-cover transition-opacity duration-300 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImgLoaded(true)}
        />
      </div>

      <div className="p-4 space-y-3">
        <p className="text-[15px] leading-relaxed">{post.caption}</p>

        <div className="flex items-center gap-3">
          <button
            className={`btn ${liked ? 'bg-pink-600 text-white border-0' : 'btn-ghost'} heart-pop`}
            onClick={toggleLike}
            aria-pressed={liked}
          >
            {liked ? '♥ Liked' : '♡ Like'}
          </button>
          <span className="badge">{post.likes}</span>

          <button className="btn btn-ghost" onClick={sharePost}>Share</button>
          <span className="badge">{post.shares}</span>
        </div>
      </div>
    </article>
  );
}
