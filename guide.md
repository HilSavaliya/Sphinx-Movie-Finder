# 🎬 CinemaVault - Local Hosting Guide

## Getting Your Code Locally 

### Method 1: Direct Download (Recommended)
1. **In Lovable Editor**: Click the **GitHub** button in the top-right corner
2. **Connect GitHub**: Authorize Lovable to access your GitHub account
3. **Create Repository**: Click "Create Repository" to sync your code to GitHub
4. **Clone Locally**: 
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

### Method 2: Manual Code Copy
1. Enable **Dev Mode** in Lovable (top-left toggle)
2. Copy all files from the project structure
3. Create a new Vite React project locally:
   ```bash
   npm create vite@latest cinemavault --template react-ts
   cd cinemavault
   npm install
   ```
4. Replace the generated files with your copied code

## 🚀 Local Development Setup

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** or **yarn** or **bun**
- **Git** (for version control)

### Installation Steps

1. **Install Dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

2. **Get TMDB API Key** (for real movie data)
   - Visit [TMDB API](https://www.themoviedb.org/settings/api)
   - Sign up and get your API key
   - Replace the demo key in `src/services/tmdbApi.ts`:
   ```typescript
   const API_KEY = 'your_actual_tmdb_api_key_here';
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   # or
   yarn build
   # or
   bun build
   ```

## 🌐 Hosting Options

### Free Hosting Platforms

#### 1. **Vercel** (Recommended)
```bash
npm install -g vercel
vercel --prod
```
- Automatic deployments from GitHub
- Perfect for React/Vite projects
- Custom domains supported

#### 2. **Netlify**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```
- Drag & drop interface
- Form handling
- Serverless functions

#### 3. **GitHub Pages**
```bash
npm install --save-dev gh-pages
# Add to package.json scripts:
# "deploy": "gh-pages -d dist"
npm run deploy
```

#### 4. **Firebase Hosting**
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

### Paid Hosting Options
- **AWS S3 + CloudFront**
- **DigitalOcean App Platform**
- **Heroku**
- **Railway**

## 🛠 Tech Stack

### Core Technologies
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing

### UI Components
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **Class Variance Authority** - Component variants
- **Tailwind Merge** - CSS class merging

### Data & State
- **TanStack Query** - Server state management
- **Axios** - HTTP client
- **React Context** - Global state
- **Local Storage** - Persistent storage

### APIs
- **TMDB API** - Real movie data
- **Custom Hooks** - Reusable logic

## 📱 Mobile Optimization Features

### Responsive Design
- **Mobile-first approach**
- **Advanced grid system**
- **Touch-friendly interface**
- **Safe area handling**

### Performance
- **Image lazy loading**
- **API data caching**
- **Smooth animations**
- **Progressive loading**

### UX Enhancements
- **Enhanced mobile header**
- **Swipe gestures**
- **Pull-to-refresh**
- **Optimized search**

## 🎨 Customization

### Design System
All colors and styling are centralized in:
- `src/index.css` - CSS variables & global styles
- `tailwind.config.ts` - Tailwind configuration
- Component variants in UI components

### Adding Features
1. **New API endpoints** - Add to `src/services/tmdbApi.ts`
2. **New pages** - Create in `src/pages/`
3. **New components** - Add to `src/components/`
4. **Global state** - Extend `src/context/MovieContext.tsx`

## 🔧 Environment Variables

Create `.env.local` for sensitive data:
```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.themoviedb.org/3
```

Use in code:
```typescript
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
```

## 🚀 Performance Tips

### Optimization
- Use React.memo for expensive components
- Implement virtual scrolling for large lists
- Add service worker for caching
- Optimize images with proper formats

### Bundle Analysis
```bash
npm run build
npx bundle-analyzer dist/assets/*.js
```

## 🐛 Troubleshooting

### Common Issues
1. **API Rate Limits** - TMDB has request limits
2. **CORS Issues** - Use proper API endpoints
3. **Build Errors** - Check TypeScript types
4. **Mobile Safari** - Test specific iOS issues

### Development Tips
- Use React DevTools
- Enable source maps
- Monitor network requests
- Test on real devices

## 📦 Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext ts,tsx",
    "type-check": "tsc --noEmit"
  }
}
```

## 🎯 Production Checklist

- [ ] TMDB API key configured
- [ ] Environment variables set
- [ ] Build passes without errors
- [ ] Mobile responsive testing
- [ ] Performance optimization
- [ ] SEO meta tags added
- [ ] Error boundaries implemented
- [ ] Loading states handled
- [ ] Accessibility tested

---

## 🎉 You're All Set!

Your CinemaVault app is now ready for local development and deployment. The app features:

✅ **Real TMDB API integration**  
✅ **Advanced mobile optimization**  
✅ **Premium UI/UX design**  
✅ **Professional responsive layout**  
✅ **Modern React best practices**  

Enjoy building your premium movie discovery platform! 🍿

---

*For support or questions about this setup, feel free to reach out or check the documentation.*