import React from 'react';
import { usePopularMovies } from '@/hooks/useMovieApi';
import { MovieGrid } from '@/components/MovieGrid';
import { PremiumHero } from '@/components/PremiumHero';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star, Clock } from 'lucide-react';
import { ErrorBanner } from '@/components/ErrorBanner';

const Home = () => {
  const { data, isLoading: loading, error } = usePopularMovies();
  const movies = data?.movies?.slice(0, 12) || []; // Show top 12 for homepage
  const isFromCache = data?.isFromCache || false;

  if (error) {
    return (
      <div className="space-y-6">
        <PremiumHero />
        <ErrorBanner message="Failed to load movies" onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <PremiumHero />
      
      <div className="space-y-6">
        {/* Section Headers with Premium Styling */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl sm:text-3xl font-bold gradient-text">🎭 Featured Collection</h2>
            <Badge className="bg-cinema-purple/20 text-cinema-purple border-cinema-purple/30">
              Premium
            </Badge>
            <Badge className={`border ${isFromCache ? 'bg-orange-500/20 text-orange-400 border-orange-400/30' : 'bg-cinema-gold/20 text-cinema-gold border-cinema-gold/30'}`}>
              {isFromCache ? 'Offline' : 'Live API'}
            </Badge>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-cinema-gold" />
              <span className="hidden sm:inline">{isFromCache ? 'Cached' : 'Real-time'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-cinema-gold" />
              <span className="hidden sm:inline">{isFromCache ? 'Local Data' : 'TMDB Data'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-cinema-gold" />
              <span className="hidden sm:inline">{isFromCache ? 'Offline' : 'Fresh'}</span>
            </div>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground text-sm sm:text-base">
            Discover handpicked movies from our premium collection, featuring the latest blockbusters and timeless classics powered by real-time data
          </p>
        </div>

        <MovieGrid movies={movies} loading={loading} emptyMessage="Welcome to CinemaVault! Movies will appear here once loaded." />
      </div>
    </div>
  );
};

export default Home;