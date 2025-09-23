# 🎬 Sphinx Movie Finder

A modern movie discovery application built with React, TypeScript, and Tailwind CSS. Browse, search, and explore movies from The Movie Database (TMDB) API with a beautiful, responsive interface.

![Project Screenshot](https://image.tmdb.org/t/p/w500/placeholder-movie.jpg)

## Features

- 🔍 **Movie Search**: Find movies by title with instant results
- 📊 **Movie Details**: View comprehensive information about each movie
- 🏆 **Trending Movies**: Discover what's currently popular
- ⭐ **Popular Movies**: Browse highly-rated films
- ❤️ **Favorites**: Save and manage your favorite movies
- 📱 **Responsive Design**: Optimized for all devices
- 🎨 **Modern UI**: Built with shadcn-ui components and Tailwind CSS
- ⚡ **Fast Performance**: Powered by Vite and React Query

## Tech Stack

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn-ui, Radix UI
- **State Management**: React Query, React Context
- **Routing**: React Router
- **Icons**: Lucide React
- **API**: TMDB API

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/ITSSPHINX/Sphinx-Movie-Finder.git
   cd Sphinx-Movie-Finder
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Get your TMDB API key:
   - Visit [TMDB API](https://www.themoviedb.org/settings/api)
   - Sign up and get your API key
   - Replace the demo key in `src/services/tmdbApi.js`:
   ```javascript
   const API_KEY = 'your_actual_tmdb_api_key_here';
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Project Structure

```
src/
├── components/         # UI components
├── context/           # React contexts
├── data/              # Static data
├── hooks/             # Custom hooks
├── pages/             # Page components
├── services/          # API services
└── assets/            # Images and other assets
```

## Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to Netlify

### GitHub Pages

1. Install `gh-pages`:
   ```bash
   npm install --save-dev gh-pages
   ```
2. Add to `package.json`:
   ```json
   "homepage": "https://ITSSPHINX.github.io/Sphinx-Movie-Finder",
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```
3. Run `npm run deploy`

## Environment Variables

Create a `.env.local` file for sensitive data:

```env
VITE_TMDB_API_KEY=your_api_key_here
VITE_API_BASE_URL=https://api.themoviedb.org/3
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [TMDB API](https://www.themoviedb.org/documentation/api) for movie data
- [Vite](https://vitejs.dev/) for the fast build tool
- [React](https://reactjs.org/) for the UI framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling solution
- [shadcn-ui](https://ui.shadcn.com/) for the beautiful components
