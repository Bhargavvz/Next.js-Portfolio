# Code Cosmos Portfolio

A modern, space-themed portfolio website built with Next.js, featuring a dynamic blog system, achievements showcase, and interactive UI components.

![Code Cosmos](public/images/preview.png)

## 🚀 Features

- **Modern Tech Stack**
  - Next.js 15.0.3 with App Router
  - React with TypeScript
  - MongoDB for data persistence
  - Tailwind CSS for styling
  - Framer Motion for animations

- **Dynamic Blog System**
  - Markdown support for blog posts
  - Tag-based categorization
  - Search and filter capabilities
  - Responsive image handling
  - SEO optimization

- **Interactive UI**
  - Space-themed animations
  - Smooth page transitions
  - Responsive design
  - Dark mode optimized
  - Loading states and error boundaries

- **Authentication & Security**
  - Token-based authentication
  - Protected admin routes
  - Secure content management
  - Role-based access control

## 🛠️ Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/code-cosmos.git
   cd code-cosmos
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 📁 Project Structure

```
code-cosmos/
├── src/
│   ├── app/                 # Next.js app router pages
│   ├── components/          # React components
│   │   ├── blog/           # Blog-related components
│   │   ├── sections/       # Main page sections
│   │   └── ui/             # Reusable UI components
│   ├── lib/                # Utility functions and API
│   └── styles/             # Global styles
├── public/                 # Static assets
└── types/                 # TypeScript type definitions
```

## 🔧 Core Components

- **Blog System**
  - Dynamic post creation and editing
  - Markdown support with syntax highlighting
  - Image optimization and CDN support
  - Comment system (coming soon)

- **Portfolio Sections**
  - About Me
  - Projects Showcase
  - Achievements
  - Contact Form

- **Admin Dashboard**
  - Content management
  - Analytics (coming soon)
  - User management
  - Media library

## 🎨 Design System

- **Colors**
  - Primary: Purple (#8B5CF6)
  - Background: Dark (#000000)
  - Accents: Space-themed gradients

- **Typography**
  - Headings: Space Grotesk
  - Body: Inter

- **Components**
  - Custom buttons and inputs
  - Animated cards
  - Loading skeletons
  - Toast notifications

## 📦 Dependencies

```json
{
  "dependencies": {
    "next": "15.0.3",
    "react": "^18",
    "framer-motion": "^10",
    "tailwindcss": "^3",
    "mongoose": "^7",
    "date-fns": "^2",
    "lucide-react": "^0.292.0"
  }
}
```

## 🔒 Security Features

- CSRF protection
- XSS prevention
- Rate limiting
- Input validation
- Secure headers

## 🚧 Upcoming Features

- [ ] Advanced blog filtering
- [ ] Comment system
- [ ] Newsletter integration
- [ ] Analytics dashboard
- [ ] Social media sharing
- [ ] Improved accessibility
- [ ] Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting
- MongoDB for database
- All contributors and supporters

---

Built with 💜 by [Your Name]
