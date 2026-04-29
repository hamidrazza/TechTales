import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreatePost.css';

function CreatePost({ addPost }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    content: '',
    readTime: '5',
    image: ''
  });

  const categories = [
    'WEB DEVELOPMENT',
    'PROGRAMMING',
    'JAVASCRIPT',
    'DEVELOPER TOOLS',
    'PRODUCTIVITY',
    'LEARNING',
    'TUTORIAL',
    'OTHER'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.category && formData.content) {
      addPost(formData);
      navigate('/');
    } else {
      alert('Please fill in all required fields');
    }
  };

  const applyFormatting = (command) => {
    document.execCommand(command, false, null);
  };

  return (
    <div className="create-post-page">
      <div className="create-post-container">
        <h1>Create New Post</h1>
        <p className="subtitle">Share your knowledge with the community.</p>

        <form onSubmit={handleSubmit} className="create-post-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter a catchy title..."
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Description (Optional)</label>
            <input
              type="text"
              name="description"
              placeholder="Brief description of your post..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Read Time (minutes)</label>
            <input
              type="number"
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Image URL (Optional)</label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Content</label>
            <div className="editor-toolbar">
              <button type="button" onClick={() => applyFormatting('bold')} title="Bold">
                <strong>B</strong>
              </button>
              <button type="button" onClick={() => applyFormatting('italic')} title="Italic">
                <em>I</em>
              </button>
              <button type="button" onClick={() => applyFormatting('underline')} title="Underline">
                <u>U</u>
              </button>
              <button type="button" onClick={() => applyFormatting('strikethrough')} title="Strikethrough">
                <s>S</s>
              </button>
              <div className="divider"></div>
              <button type="button" onClick={() => applyFormatting('insertUnorderedList')} title="Bullet List">
                •
              </button>
              <button type="button" onClick={() => applyFormatting('insertOrderedList')} title="Numbered List">
                1.
              </button>
            </div>
            <div
              contentEditable
              className="editor"
              onInput={(e) => setFormData(prev => ({
                ...prev,
                content: e.currentTarget.innerHTML
              }))}
              placeholder="Write your post content here..."
            ></div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn-draft">
              Preview
            </button>
            <button type="submit" className="btn-publish">
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
