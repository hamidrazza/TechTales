import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createPost } from '../../api/postsApi';
import Modal from '../ui/Modal';

const CATEGORIES = ['Web Development', 'JavaScript', 'Programming', 'Developer Tools', 'Productivity', 'Career'];

const TOOLS = [
  { label: 'B', title: 'Bold' }, { label: 'I', title: 'Italic' },
  { label: 'U', title: 'Underline' }, { label: 'S', title: 'Strikethrough' },
  { label: '</>', title: 'Code' }, { label: '"', title: 'Quote' },
];

export default function NewPostModal({ onClose, onCreated }) {
  const { user } = useAuth();
  const [form,   setForm]   = useState({ title: '', category: '', content: '' });
  const [saving, setSaving] = useState(false);
  const [error,  setError]  = useState(null);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (isDraft = false) => {
    if (!form.title.trim() || !form.content.trim()) { setError('Title and content are required.'); return; }
    if (!user) { setError('Please sign in to publish.'); return; }
    setSaving(true); setError(null);
    try {
      await createPost({ ...form, draft: isDraft });
      onCreated?.();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post');
    } finally { setSaving(false); }
  };

  return (
    <Modal wide onClose={onClose} title="Create New Post" subtitle="Share your knowledge with the community.">
      <div className="flex flex-col gap-4">
        {error && (
          <div className="px-3 py-2.5 bg-red-50 border border-red-200 rounded text-sm text-red-600">{error}</div>
        )}

        {/* Title */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Title</label>
          <input
            className="w-full px-3 py-2.5 border border-gray-200 rounded text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition"
            placeholder="Enter a catchy title…"
            value={form.title} onChange={(e) => set('title', e.target.value)}
          />
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-gray-700">Content</label>
          {/* Toolbar */}
          <div className="flex gap-0.5 px-2 py-1.5 border border-gray-200 border-b-0 rounded-t bg-gray-50">
            {TOOLS.map((t) => (
              <button key={t.label} title={t.title}
                className="px-2 py-1 rounded text-xs font-semibold text-gray-500 hover:bg-gray-200 hover:text-black transition">
                {t.label}
              </button>
            ))}
          </div>
          <textarea
            className="w-full px-3 py-2.5 border border-gray-200 rounded-b text-sm outline-none focus:border-black focus:ring-2 focus:ring-black/5 transition resize-y min-h-[180px]"
            placeholder="Write your post content here…"
            value={form.content} onChange={(e) => set('content', e.target.value)}
            rows={10}
          />
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-1">
          <button className="text-sm text-gray-400 hover:text-black transition">Preview</button>
          <div className="flex gap-2">
            <button
              onClick={() => handleSubmit(true)} disabled={saving}
              className="px-4 py-2 border border-gray-200 rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50 transition"
            >Save as Draft</button>
            <button
              onClick={() => handleSubmit(false)} disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded text-sm font-medium hover:bg-gray-800 disabled:opacity-50 transition"
            >
              {saving ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
              Publish Post
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
