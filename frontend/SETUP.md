# Quick Start Guide

## Setup Instructions

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm start
```

The app will open at `http://localhost:3000`

## Project Features

### ✨ Home Page
- Search bar to find posts
- Display latest 6 posts
- Category badges for each post
- Read time indicator

### 📝 Create New Post
- Rich text editor with formatting options (bold, italic, underline, lists)
- Title and category selection
- Optional description and image URL
- Local storage persistence

### 📄 Post Detail Page
- Full post content display
- Author information card
- Related posts sidebar
- Action buttons (Like, Comment, Share)

### 🔍 All Posts Page
- Filter by category
- Sort by newest/oldest
- Browse all created posts

### 📱 Responsive Design
- Mobile-first approach
- Adapts to all screen sizes
- Touch-friendly interface

## File Structure Overview

```
src/
├── components/          # Reusable UI components
├── pages/              # Full page components
├── styles/             # CSS files (one per component/page)
└── App.js              # Main app with routing
```

## Component Breakdown

### Components (`src/components/`)
- **Header.js** - Navigation bar with logo and menu
- **Footer.js** - Footer with links and social media
- **PostCard.js** - Reusable post card component

### Pages (`src/pages/`)
- **Home.js** - Homepage with search and latest posts
- **AllPosts.js** - Browse and filter all posts
- **PostDetail.js** - Read full post with author info
- **CreatePost.js** - Create new blog post
- **About.js** - About the platform
- **Contact.js** - Contact form

## Data Structure

Posts are stored in localStorage with the following structure:
```javascript
{
  id: timestamp,
  title: "Post Title",
  category: "WEB DEVELOPMENT",
  description: "Short description",
  content: "HTML content",
  readTime: 5,
  image: "image-url",
  date: "May 25, 2024"
}
```

## Categories Available
- WEB DEVELOPMENT
- PROGRAMMING
- JAVASCRIPT
- DEVELOPER TOOLS
- PRODUCTIVITY
- LEARNING
- TUTORIAL
- OTHER

## Styling
All components use CSS with CSS variables for consistent theming:
- Primary Color: Black (#000000)
- Secondary Color: White (#FFFFFF)
- Accent Color: Blue (#0066CC)

## Next Steps
1. Customize colors in `src/styles/index.css`
2. Add sample posts by creating posts in the app
3. Modify the footer links with your actual social media
4. Add your own category options in CreatePost.js
5. Deploy to Vercel, Netlify, or your preferred hosting

## Troubleshooting

### Port Already in Use
```bash
# Use a different port
PORT=3001 npm start
```

### Clear localStorage
Open browser console and run:
```javascript
localStorage.removeItem('techposts-posts');
```

### Build for Production
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.
