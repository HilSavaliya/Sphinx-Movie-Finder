import React from 'react';
import { usePopularMovies } from '@/hooks/useMovieApi';
import { MovieGrid } from '@/components/MovieGrid';
import { ErrorBanner } from '@/components/ErrorBanner';

const Popular = () => {
  const { data, isLoading: loading, error } = usePopularMovies();
  const movies = data?.movies || [];
  const isFromCache = data?.isFromCache || false;

  if (error) {
    return (
      <div className="space-y-6">
        <ErrorBanner message="Failed to load popular movies" onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center glass-effect rounded-2xl p-6 mx-auto max-w-2xl">
        <h1 className="text-2xl sm:text-4xl font-bold gradient-text mb-3">
          🌟 Popular Movies
        </h1>
        <p className="text-muted-foreground text-sm sm:text-base">
          The most loved movies by audiences worldwide
        </p>
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {isFromCache ? (
            <>
              <span className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                Offline Mode
              </span>
              <span className="text-xs bg-cinema-purple/20 text-cinema-purple px-2 py-1 rounded-full">
                Cached Results
              </span>
            </>
          ) : (
            <>
              <span className="text-xs bg-cinema-gold/20 text-cinema-gold px-2 py-1 rounded-full">
                Live TMDB Data
              </span>
              <span className="text-xs bg-cinema-purple/20 text-cinema-purple px-2 py-1 rounded-full">
                Updated Daily
              </span>
            </>
          )}
        </div>
      </div>
      
      <MovieGrid
        movies={movies}
        loading={loading}
        emptyMessage="No popular movies available at the moment."
      />
    </div>
  );
};

export default Popular;

