# TechPosts - Complete Project Structure

## Directory Tree

```
frontend/
│
├── public/
│   └── index.html              # HTML entry point
│
├── src/
│   ├── components/
│   │   ├── Header.js           # Navigation header with logo & menu
│   │   ├── Header.css
│   │   ├── Footer.js           # Footer with social links
│   │   ├── Footer.css
│   │   ├── PostCard.js         # Reusable post card component
│   │   └── PostCard.css
│   │
│   ├── pages/
│   │   ├── Home.js             # Homepage (latest posts + search)
│   │   ├── AllPosts.js         # Browse all posts (filter/sort)
│   │   ├── PostDetail.js       # Individual post view
│   │   ├── CreatePost.js       # Create new post form
│   │   ├── About.js            # About page
│   │   └── Contact.js          # Contact form page
│   │
│   ├── styles/
│   │   ├── index.css           # Global styles & CSS variables
│   │   ├── App.css             # App layout
│   │   ├── Header.css          # Header styling
│   │   ├── Footer.css          # Footer styling
│   │   ├── PostCard.css        # Post card styling
│   │   ├── Home.css            # Homepage layout
│   │   ├── CreatePost.css      # Form styling
│   │   ├── PostDetail.css      # Post detail layout
│   │   ├── AllPosts.css        # All posts page
│   │   ├── About.css           # About page styling
│   │   └── Contact.css         # Contact form styling
│   │
│   ├── App.js                  # Main app component with routing
│   └── index.js                # React entry point
│
├── .gitignore                  # Git ignore rules
├── package.json                # Dependencies & scripts
├── README.md                   # Project documentation
├── SETUP.md                    # Setup instructions
└── PROJECT_STRUCTURE.md        # This file
```

## Component Architecture

### App Component (App.js)
- State Management: posts, routing
- Local Storage integration
- Route definitions

### Layout Components
```
<App>
  ├── <Header /> (Navigation)
  ├── <Router> (Page Routes)
  │   ├── <Home /> (Homepage)
  │   ├── <AllPosts /> (Posts listing)
  │   ├── <PostDetail /> (Single post)
  │   ├── <CreatePost /> (New post form)
  │   ├── <About /> (About page)
  │   └── <Contact /> (Contact form)
  └── <Footer /> (Footer)
```

### Data Flow
```
App.js (State)
├── posts (array of post objects)
├── setPosts (update posts)
├── addPost() (create new post)
└── deletePost() (remove post)
    │
    └─→ All child components via props
```

## Routing Structure

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home.js | Display latest posts |
| `/all-posts` | AllPosts.js | Browse all posts |
| `/post/:id` | PostDetail.js | View full post |
| `/create` | CreatePost.js | Create new post |
| `/about` | About.js | About information |
| `/contact` | Contact.js | Contact form |

## Feature Overview

### 🏠 Home Page Features
- Search functionality (filters by title/description)
- Latest 6 posts grid layout
- Hero section with tagline
- Category badges on posts

### 📝 Create Post Features
- Title input field
- Category dropdown (8 categories)
- Description text area
- Rich text editor with toolbar
  - Bold, Italic, Underline, Strikethrough
  - Bullet lists, Numbered lists
- Read time input
- Image URL input
- Publish button

### 📄 Post Detail Features
- Full post content display
- Author information card
- Author avatar (initials)
- Related posts sidebar (3 posts)
- Action buttons (Like, Comment, Share)
- Breadcrumb navigation
- Post metadata (date, read time, category)

### 🔍 All Posts Features
- Category filter dropdown
- Sort options (Newest/Oldest)
- Grid layout of all posts
- Empty state message

### 📱 About Page
- Mission statement
- Features list (with checkmarks)
- Community information
- Call-to-action

### 💬 Contact Page
- Contact form (name, email, message)
- Success message on submit
- Contact information sidebar
- Social media links

## CSS Variables (Theme)

```css
--primary-color: #000000      /* Black */
--secondary-color: #ffffff    /* White */
--text-color: #333333         /* Dark Gray */
--light-text: #666666         /* Medium Gray */
--border-color: #e0e0e0       /* Light Gray */
--hover-color: #f5f5f5        /* Very Light Gray */
--accent-color: #0066cc       /* Blue */
--error-color: #e74c3c        /* Red */
--success-color: #27ae60       /* Green */
--warning-color: #f39c12       /* Orange */
```

## Local Storage

### Key: `techposts-posts`
Stores array of post objects:
```javascript
[
  {
    id: 1716638400000,
    title: "Building a Blog App",
    category: "WEB DEVELOPMENT",
    description: "Learn how to build...",
    content: "<p>In this tutorial...</p>",
    readTime: "5",
    image: "https://...",
    date: "May 25, 2024"
  },
  ...
]
```

## Responsive Breakpoints

- **Desktop**: >= 1024px (3-column grid)
- **Tablet**: 768px - 1023px (2-column grid)
- **Mobile**: < 768px (1-column grid)

All components are mobile-first and fully responsive.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- CSS modules for scoped styling
- Component-based architecture
- Efficient re-renders with React hooks
- Local storage for offline data persistence
- Optimized image rendering with object-fit

## Security Features

- XSS protection via React's built-in escaping
- localStorage for client-side only data
- No server-side API calls by default
- Safe HTML rendering via dangerouslySetInnerHTML for user content

## Future Enhancement Areas

1. **Backend Integration**
   - API endpoints for CRUD operations
   - Database integration (MongoDB, PostgreSQL)

2. **Authentication**
   - User registration & login
   - User profiles
   - Post ownership

3. **Advanced Features**
   - Comments system
   - Likes/bookmarks
   - Tags system
   - Search with filters
   - Markdown editor
   - Image uploads

4. **Performance**
   - Code splitting
   - Lazy loading
   - Image optimization
   - Caching strategies

5. **Analytics**
   - Page views tracking
   - User engagement metrics
   - Popular posts tracking

## Getting Started

1. Install dependencies: `npm install`
2. Start dev server: `npm start`
3. Create your first post by clicking "New Post"
4. View all posts and enjoy!

---

For detailed setup instructions, see [SETUP.md](SETUP.md)
For project information, see [README.md](README.md)
