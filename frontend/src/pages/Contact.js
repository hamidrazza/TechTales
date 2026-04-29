import React, { useState } from 'react';
import '../styles/Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-container">
        <div className="contact-hero">
          <h1>Get in Touch</h1>
          <p className="subtitle">Have questions or suggestions? We'd love to hear from you!</p>
        </div>

        <div className="contact-content">
          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows="6"
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                Send Message
              </button>

              {submitted && (
                <div className="success-message">
                  ✓ Thank you! We've received your message and will get back to you soon.
                </div>
              )}
            </form>
          </div>

          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="info-item">
              <h4>📧 Email</h4>
              <p>contact@techposts.com</p>
            </div>
            <div className="info-item">
              <h4>🐙 GitHub</h4>
              <p>github.com/techposts</p>
            </div>
            <div className="info-item">
              <h4>🐦 Twitter</h4>
              <p>@techposts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
