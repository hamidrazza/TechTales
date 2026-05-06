import { formatDate, truncate } from '../../utils/helpers';

export default function PostCard({ post }) {
  const { title, content, createdAt, author } = post;

  return (
    <article className="flex flex-col gap-3 p-4 border border-gray-700 rounded-lg bg-gray-900 hover:bg-gray-800 hover:border-gray-600 transition-all duration-150 h-full">
        {/* Title */}
        <h3 className="font-display font-bold text-lg leading-snug text-white hover:text-gray-300 transition">
          {title}
        </h3>
        
        {/* Content */}
        <p className="text-sm text-gray-400 leading-relaxed flex-1 line-clamp-3">
          {truncate(content, 150)}
        </p>
        
        {/* Created Time & Author */}
        <div className="flex items-center justify-between text-xs text-gray-500 mt-auto pt-2 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <CalIcon />
            <span>{formatDate(createdAt)}</span>
          </div>
          <span className="text-gray-400 font-medium">{author}</span>
        </div>
    </article>
  );
}

const CalIcon = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/>
    <line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
  </svg>
);
