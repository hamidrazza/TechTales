# TechPosts - Blog Application

A modern, simple blogging web application built with React.js and Vanilla JavaScript.

## Project Structure

```
frontend/
├── public/
│   └── index.html              # Main HTML file
├── src/
│   ├── components/             # Reusable React components
│   │   ├── Header.js           # Navigation header
│   │   ├── Footer.js           # Footer component
│   │   └── PostCard.js         # Post card component
│   ├── pages/                  # Page components
│   │   ├── Home.js             # Homepage with latest posts
│   │   ├── AllPosts.js         # All posts page with filters
│   │   ├── PostDetail.js       # Individual post detail page
│   │   ├── CreatePost.js       # Create new post page
│   │   ├── About.js            # About page
│   │   └── Contact.js          # Contact page
│   ├── styles/                 # CSS files
│   │   ├── index.css           # Global styles
│   │   ├── App.css             # App layout
│   │   ├── Header.css          # Header styles
│   │   ├── Footer.css          # Footer styles
│   │   ├── PostCard.css        # Post card styles
│   │   ├── Home.css            # Homepage styles
│   │   ├── CreatePost.css      # Create post form styles
│   │   ├── PostDetail.css      # Post detail styles
│   │   ├── AllPosts.css        # All posts page styles
│   │   ├── About.css           # About page styles
│   │   └── Contact.css         # Contact page styles
│   ├── App.js                  # Main app component
│   └── index.js                # React entry point
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## Features

- **Homepage**: Display latest posts with search functionality
- **Post Creation**: Create new blog posts with rich text editor
- **Post Details**: View full post with author information and related posts
- **All Posts**: Browse all posts with category filtering and sorting
- **Responsive Design**: Mobile-friendly layout
- **Local Storage**: Posts are saved in browser's localStorage
- **Categories**: Organize posts by categories
- **Author Info**: Display author details on posts
- **Related Posts**: Show related posts in the post detail page

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Available Scripts

- `npm start` - Run the app in development mode
- `npm build` - Build the app for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App (irreversible)

## Technologies Used

- **React.js 18.2.0** - UI library
- **React Router v6** - Client-side routing
- **Vanilla CSS** - Styling
- **Local Storage** - Data persistence

## Pages and Routes

- `/` - Homepage with latest posts
- `/all-posts` - Browse all posts
- `/post/:id` - Individual post detail
- `/create` - Create new post
- `/about` - About page
- `/contact` - Contact page

## Styling Highlights

- Modern, clean design inspired by the TechPosts mockups
- Dark theme with light accent colors
- Responsive grid layout
- Smooth hover effects and transitions
- Mobile-first approach

## Color Scheme

- Primary Color: `#000000` (Black)
- Secondary Color: `#FFFFFF` (White)
- Accent Color: `#0066CC` (Blue)
- Text Color: `#333333` (Dark Gray)
- Light Text: `#666666` (Medium Gray)
- Border Color: `#E0E0E0` (Light Gray)

## Future Enhancements

- User authentication and profiles
- Comments section on posts
- Like/Share functionality
- Tags and advanced search
- Backend integration
- Image upload feature
- Markdown support
- Dark mode toggle

## License

MIT License - feel free to use this project for learning purposes.
