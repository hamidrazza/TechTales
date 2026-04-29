# TechTales — Frontend

React 18 + Vite frontend for the TechTales blog platform.  
Connects to a Spring Boot backend via REST APIs with JWT auth.

---

## 📁 Full Folder Structure

```
techtales-frontend/
├── public/
│   └── index.html                  # HTML entry + Google Fonts
│
├── src/
│   ├── api/
│   │   ├── axios.js                # Axios instance + JWT interceptors + 401 handler
│   │   ├── authApi.js              # POST /auth/signup, POST /auth/login
│   │   └── postsApi.js             # GET|POST /posts, GET|PUT|DELETE /posts/:id
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx          # Sticky nav, auth actions, mobile menu
│   │   │   ├── Navbar.module.css
│   │   │   ├── Footer.jsx          # Links + socials
│   │   │   └── Footer.module.css
│   │   │
│   │   ├── posts/
│   │   │   ├── PostCard.jsx        # Card with image, category tag, read time
│   │   │   ├── PostCard.module.css
│   │   │   ├── NewPostModal.jsx    # Create post modal (title, category, content)
│   │   │   └── NewPostModal.module.css
│   │   │
│   │   ├── ui/
│   │   │   ├── Modal.jsx           # Reusable overlay modal (Escape to close)
│   │   │   └── Modal.module.css
│   │   │
│   │   └── auth/
│   │       ├── AuthModal.jsx       # Login / Signup modal
│   │       └── AuthModal.module.css
│   │
│   ├── context/
│   │   └── AuthContext.jsx         # Global auth state + login/signup/logout
│   │
│   ├── hooks/
│   │   └── usePosts.js             # Fetch all posts, expose loading + error + refetch
│   │
│   ├── pages/
│   │   ├── Home.jsx                # Hero + search + sorted post grid
│   │   ├── Home.module.css
│   │   ├── AllPosts.jsx            # All posts + category filter + search
│   │   ├── AllPosts.module.css
│   │   ├── SinglePost.jsx          # Full post + related sidebar + owner actions
│   │   ├── SinglePost.module.css
│   │   ├── Static.jsx              # About + Contact pages
│   │   └── Static.module.css
│   │
│   ├── utils/
│   │   └── helpers.js              # formatDate, readTime, truncate, getInitials, postImage
│   │
│   ├── App.jsx                     # Routes + AuthProvider wrapper
│   ├── main.jsx                    # ReactDOM.createRoot entry
│   └── index.css                   # CSS variables + global reset + utilities
│
├── .env.example                    # VITE_API_BASE_URL=http://localhost:8080
├── vite.config.js                  # Dev server + /api proxy to Spring Boot
└── package.json
```

---

## 🔌 API Integration

| Method | Endpoint        | Used in                           |
|--------|-----------------|-----------------------------------|
| POST   | /auth/signup    | AuthModal → signup()              |
| POST   | /auth/login     | AuthModal → login()               |
| GET    | /posts          | usePosts hook, SinglePost related |
| GET    | /posts/{id}     | SinglePost page                   |
| POST   | /posts          | NewPostModal → createPost()       |
| PUT    | /posts/{id}     | EditPost (extend NewPostModal)    |
| DELETE | /posts/{id}     | SinglePost owner delete           |

---

## 🔐 Auth Flow

1. User logs in → Spring Boot returns `{ token, user }`
2. Token stored in `localStorage` as `tt_token`
3. Every Axios request auto-attaches `Authorization: Bearer <token>`
4. On 401 response → token cleared, user redirected to home

---

## 🚀 Quick Start

```bash
# 1. Clone / enter directory
cd techtales-frontend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Set VITE_API_BASE_URL=http://localhost:8080

# 4. Run dev server (proxies /api → Spring Boot)
npm run dev
# → http://localhost:3000

# 5. Build for production
npm run build
```

---

## 🛠️ Spring Boot CORS Config

Add this to your Spring Boot app:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins("http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .exposedHeaders("Authorization");
    }
}
```

## 🛠️ Spring Boot JWT Expected Responses

**POST /auth/login & /auth/signup:**
```json
{
  "token": "eyJhbGci...",
  "user": { "id": 1, "name": "Dev Notes", "email": "dev@example.com", "bio": "..." }
}
```

**GET /posts:**
```json
[
  {
    "id": 1,
    "title": "Building a Blog App",
    "content": "...",
    "category": "Web Development",
    "createdAt": "2024-05-25T10:00:00Z",
    "author": { "id": 1, "name": "Dev Notes" }
  }
]
```

---

## 🎨 Design Tokens

| Token           | Value                      |
|-----------------|----------------------------|
| `--font-display`| Playfair Display (serif)   |
| `--font-body`   | DM Sans (sans-serif)       |
| `--black`       | `#0a0a0a`                  |
| `--white`       | `#fafafa`                  |
| `--radius`      | `4px`                      |
| `--radius-lg`   | `8px`                      |
