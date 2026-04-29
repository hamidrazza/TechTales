import styles from './Static.module.css';

export function About() {
  return (
    <main className={`container ${styles.page}`}>
      <h1 className={styles.title}>About TechTales</h1>
      <p className={styles.lead}>TechTales is a community-driven platform where developers share ideas, tutorials, and experiences.</p>
      <p>Whether you're learning to code, building production systems, or sharing hard-won lessons, TechTales is your space to write, learn, and grow.</p>
    </main>
  );
}

export function Contact() {
  return (
    <main className={`container ${styles.page}`}>
      <h1 className={styles.title}>Contact</h1>
      <p className={styles.lead}>Have feedback, questions, or ideas? We'd love to hear from you.</p>
      <p>Reach us at <a href="mailto:hello@techtales.dev" className={styles.link}>hello@techtales.dev</a></p>
    </main>
  );
}
