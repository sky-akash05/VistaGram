'use client';
import { useRef, useState } from 'react';

export default function UploadForm({ onCreated }: { onCreated: () => void }) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [submitting, setSubmitting] = useState(false);

  return (
    <form
      className="card p-5 space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        if (submitting) return;
        setSubmitting(true);
        const form = e.currentTarget as HTMLFormElement;

        try {
          const fd = new FormData(form);
          const res = await fetch('/api/upload', { method: 'POST', body: fd });
          const j = await res.json();

          if (res.ok) {
            form.reset();
            if (fileRef.current) fileRef.current.value = '';
            onCreated();
          } else {
            alert(j.error || 'Upload failed');
          }
        } catch (err: any) {
          alert(err?.message || 'Upload failed');
        } finally {
          setSubmitting(false);
        }
      }}
    >
      <div className="space-y-1">
        <label className="label">Username</label>
        <input name="username" placeholder="@you" required className="input" />
      </div>

      <div className="space-y-1">
        <label className="label">Caption</label>
        <textarea name="caption" placeholder="Write something…" className="input" rows={2} />
      </div>

      <div className="space-y-2">
        <label className="label">Photo</label>
        <input
          ref={fileRef}
          type="file"
          name="image"
          accept="image/*"
          capture="environment"
          className="input"
          required
        />
        <p className="text-[11px] text-gray-500">Images are stored locally in <code>/public/uploads</code>.</p>
      </div>

      <div className="flex items-center gap-2">
        <button className="btn btn-primary" disabled={submitting}>
          {submitting ? 'Uploading…' : 'Capture & Upload'}
        </button>
        <span className="count">Make it a good one ✨</span>
      </div>
    </form>
  );
}
