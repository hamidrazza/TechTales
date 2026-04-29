import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { createPost } from '../../api/postsApi';
import Modal from '../ui/Modal';
import styles from './NewPostModal.module.css';

const CATEGORIES = ['Web Development', 'JavaScript', 'Programming', 'Developer Tools', 'Productivity', 'Career'];

export default function NewPostModal({ onClose, onCreated }) {
  const { user } = useAuth();
  const [form,    setForm]    = useState({ title: '', category: '', content: '' });
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState(null);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (isDraft = false) => {
    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required.'); return;
    }
    if (!user) { setError('Please sign in to publish a post.'); return; }

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
    <Modal onClose={onClose} title="Create New Post" subtitle="Share your knowledge with the community.">
      <div className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.field}>
          <label htmlFor="tt-title">Title</label>
          <input
            id="tt-title" className="input"
            placeholder="Enter a catchy title..."
            value={form.title} onChange={(e) => set('title', e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="tt-cat">Category</label>
          <select
            id="tt-cat" className="input select"
            value={form.category} onChange={(e) => set('category', e.target.value)}
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles.field}>
          <label>Content</label>
          <div className={styles.toolbar}>
            {['B','I','U','S','</>','"'].map((t) => (
              <button key={t} className={styles.toolBtn}><span>{t}</span></button>
            ))}
          </div>
          <textarea
            className={`input ${styles.editor}`}
            placeholder="Write your post content here..."
            value={form.content}
            onChange={(e) => set('content', e.target.value)}
            rows={10}
          />
        </div>

        <div className={styles.actions}>
          <button className="btn btn-ghost btn-sm" disabled={saving}>Preview</button>
          <div className={styles.right}>
            <button className="btn btn-secondary" onClick={() => handleSubmit(true)} disabled={saving}>Save as Draft</button>
            <button className="btn btn-primary" onClick={() => handleSubmit(false)} disabled={saving}>
              {saving ? <span className="spinner" style={{ width:14,height:14 }} /> : 'Publish Post'}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
