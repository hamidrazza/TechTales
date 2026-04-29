import { Link } from 'react-router-dom';
import { formatDate, readTime, truncate, postImage } from '../../utils/helpers';
import styles from './PostCard.module.css';

export default function PostCard({ post }) {
  const { id, title, content, category, createdAt, author } = post;

  return (
    <article className={`${styles.card} fade-in`}>
      <Link to={`/posts/${id}`} className={styles.imgWrap}>
        <img src={postImage(id)} alt={title} loading="lazy" />
      </Link>
      <div className={styles.body}>
        {category && <span className="tag">{category}</span>}
        <Link to={`/posts/${id}`} className={styles.title}>
          <h3>{title}</h3>
        </Link>
        <p className={styles.excerpt}>{truncate(content)}</p>
        <div className={styles.meta}>
          <CalendarIcon />
          <span>{formatDate(createdAt)}</span>
          <span className={styles.dot}>•</span>
          <ClockIcon />
          <span>{readTime(content)}</span>
        </div>
      </div>
    </article>
  );
}

const CalendarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
);
const ClockIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
);
