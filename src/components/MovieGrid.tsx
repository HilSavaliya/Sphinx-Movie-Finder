import React from 'react';
import { PremiumMovieCard } from './PremiumMovieCard';
import { LoadingSpinner } from './LoadingSpinner';
import { type Movie } from '@/context/MovieContext';

interface MovieGridProps {
  movies: Movie[];
  loading?: boolean;
  title?: string;
  emptyMessage?: string;
}

export const MovieGrid = ({ movies, loading, title, emptyMessage = "No movies found." }: MovieGridProps) => {
  if (loading) {
    return (
      <div className="space-y-6">
        {title && (
          <h2 className="text-3xl font-bold gradient-text">{title}</h2>
        )}
        <div className="advanced-mobile-grid">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="bg-muted rounded-lg aspect-[2/3] mb-3"></div>
              <div className="bg-muted h-4 rounded mb-2"></div>
              <div className="bg-muted h-3 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render
  return (
    <div className="space-y-6 mobile-optimized">
      {title && (
        <h2 className="text-2xl md:text-3xl font-bold gradient-text">{title}</h2>
      )}
      
      {movies.length === 0 ? (
        <div className="text-center py-12">
          <div className="max-w-sm mx-auto">
            <div className="text-6xl mb-4">🎬</div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No movies found</h3>
            <p className="text-muted-foreground">{emptyMessage}</p>
          </div>
        </div>
      ) : (
        <div className="advanced-mobile-grid">
          {movies.map((movie) => (
            <PremiumMovieCard 
              key={`movie-${movie.id}`} 
              movie={movie}
              className="animate-fade-in"
            />
          ))}
        </div>
      )}
    </div>
  );
};