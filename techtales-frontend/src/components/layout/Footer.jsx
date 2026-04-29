import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const NAV = [
  { label: 'Explore', links: [{ to: '/posts', text: 'All Posts' }, { to: '/about', text: 'About' }, { to: '/contact', text: 'Contact' }] },
  { label: 'Create',  links: [{ to: '/?new=1', text: 'New Post' }] },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <span className={styles.logo}>TechTales</span>
          <p>A space to share ideas, learn together and grow as developers.</p>
          <div className={styles.socials}>
            <a href="https://github.com/hamidrazza" aria-label="GitHub" target="_blank" rel="noreferrer"><GithubIcon /></a>
            <a href="https://twitter.com/mdhamidrazza" aria-label="Twitter" target="_blank" rel="noreferrer"><TwitterIcon /></a>
            <a href="https://linkedin.com/in/hamidrazza" aria-label="LinkedIn" target="_blank" rel="noreferrer"><LinkedInIcon /></a>
          </div>
        </div>
        {NAV.map((col) => (
          <div key={col.label} className={styles.col}>
            <h4>{col.label}</h4>
            <ul>{col.links.map((l) => <li key={l.to}><Link to={l.to}>{l.text}</Link></li>)}</ul>
          </div>
        ))}
      </div>
      <div className={styles.copy}>
        <span>© {new Date().getFullYear()} TechTales. All rights reserved.</span>
      </div>
    </footer>
  );
}

const GithubIcon   = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.37.6.11.82-.26.82-.58v-2.03c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.04.13 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>;
const TwitterIcon  = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
const LinkedInIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>;
