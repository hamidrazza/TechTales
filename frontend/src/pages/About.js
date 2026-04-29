import React from 'react';
import '../styles/About.css';

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-hero">
          <h1>About TechPosts</h1>
          <p className="subtitle">A community for developers and tech enthusiasts</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              TechPosts is dedicated to sharing knowledge and fostering a community of developers
              who are passionate about technology, code, and continuous learning. We believe in the
              power of sharing ideas and helping each other grow.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <ul className="features-list">
              <li>In-depth tutorials on modern web development</li>
              <li>Best practices and clean code principles</li>
              <li>Developer tools and productivity tips</li>
              <li>Real-world project examples and case studies</li>
              <li>Community discussions and knowledge sharing</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Our Community</h2>
            <p>
              Whether you're a beginner just starting your coding journey or an experienced developer
              looking to expand your knowledge, TechPosts is the place for you. Join thousands of
              developers sharing insights, asking questions, and learning together.
            </p>
          </section>

          <section className="about-section">
            <h2>Get Started</h2>
            <p>
              Ready to share your knowledge? Create a new post and contribute to our growing collection
              of articles. Every perspective matters, and your experience could help someone else!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
