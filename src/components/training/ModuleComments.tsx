'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { getIdToken } from '@/lib/firebase/auth';

interface Comment {
  id: string;
  text: string;
  displayName: string;
  uid: string;
  createdAt: string | null;
}

export function ModuleComments({ moduleId }: { moduleId: string }) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/modules/${moduleId}/comments`)
      .then((r) => r.json())
      .then((data) => { if (!cancelled) setComments(data.comments ?? []); })
      .catch(() => {})
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [moduleId]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || !user) return;
    setSubmitting(true);
    setError('');
    try {
      const token = await getIdToken();
      const res = await fetch(`/api/modules/${moduleId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? 'Failed to post comment.');
      } else {
        setComments((c) => [...c, data.comment]);
        setText('');
      }
    } catch {
      setError('Failed to post comment. Please try again.');
    }
    setSubmitting(false);
  }

  async function remove(id: string) {
    if (!user) return;
    setComments((c) => c.filter((cm) => cm.id !== id)); // optimistic
    try {
      const token = await getIdToken();
      await fetch(`/api/modules/${moduleId}/comments/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {
      // leave optimistically removed; a stale row reappearing on next load is low-stakes
    }
  }

  return (
    <div className="rounded-lg border border-gray-800 bg-gray-800/20 p-5">
      <h2 className="text-sm font-semibold text-gray-300 mb-1">Questions &amp; Discussion</h2>
      <p className="text-xs text-gray-600 mb-4">Ask something about this module, or help another student out.</p>

      {loading ? (
        <p className="text-xs text-gray-600">Loading…</p>
      ) : comments.length === 0 ? (
        <p className="text-xs text-gray-600 mb-4">No questions yet — be the first to ask.</p>
      ) : (
        <div className="space-y-3 mb-4">
          {comments.map((c) => {
            const date = c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
            return (
              <div key={c.id} className="text-sm border-b border-gray-800 last:border-0 pb-3 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-gray-300 font-medium text-xs">{c.displayName}</span>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {date && <span className="text-gray-600 text-xs">{date}</span>}
                    {user?.uid === c.uid && (
                      <button onClick={() => remove(c.id)} className="text-gray-700 hover:text-red-400 text-xs transition-colors">
                        Delete
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-gray-400 mt-1 whitespace-pre-wrap break-words">{c.text}</p>
              </div>
            );
          })}
        </div>
      )}

      {user ? (
        <form onSubmit={submit} className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ask a question about this module…"
            maxLength={1000}
            rows={2}
            className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-600 resize-none"
          />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={submitting || !text.trim()}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-xs font-semibold transition-colors"
          >
            {submitting ? 'Posting…' : 'Post'}
          </button>
        </form>
      ) : (
        <p className="text-xs text-gray-600">Sign in to ask a question.</p>
      )}
    </div>
  );
}
