import { useEffect, useState } from 'react';
import { MovieGrid } from '@/components/MovieGrid';
import { ErrorBanner } from '@/components/ErrorBanner';
import { useMovies, type Movie } from '@/context/MovieContext';
import { useMovieSearch } from '@/hooks/useMovieApi';
import { LoadingSpinner } from '@/components/LoadingSpinner';

const Search = () => {
  const { searchQuery } = useMovies();
  
  const { data: searchData, isLoading: loading, error: apiError } = useMovieSearch(searchQuery);
  
  const movies = searchData?.movies || [];
  // Light filtering to avoid TV episodes or invalid titles
  const filteredMovies = movies.filter((m) => {
    if (!m || !m.title) return false;
    const t = m.title.toLowerCase();
    if (t.includes('#') || t.includes('episode') || t.includes('season')) return false;
    return true;
  });
  const isFromCache = searchData?.isFromCache || false;
  const error = apiError ? 'Failed to search movies. Please try again.' : null;

  if (error) {
    return (
      <div className="space-y-6">
        <ErrorBanner message={error} onRetry={() => window.location.reload()} />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {searchQuery && (
        <div className="text-center glass-effect rounded-2xl p-6 mx-auto max-w-2xl">
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">
            🎬 Search Results
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            {loading ? (
          <span className="inline-flex items-center gap-2">
            <LoadingSpinner size="sm" />
            Searching the cinema universe...
          </span>
            ) : (
              <>
                Found <span className="font-semibold text-primary">{filteredMovies.length}</span> {filteredMovies.length === 1 ? 'movie' : 'movies'} for 
                <span className="font-semibold text-cinema-gold"> "{searchQuery}"</span>
              </>
            )}
          </p>
          {!loading && filteredMovies.length > 0 && (
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
                  <span className="text-xs bg-cinema-purple/20 text-cinema-purple px-2 py-1 rounded-full">
                    Real-time API data
                  </span>
                  <span className="text-xs bg-cinema-gold/20 text-cinema-gold px-2 py-1 rounded-full">
                    TMDB Powered
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      )}
      
      <MovieGrid
        movies={filteredMovies}
        loading={loading}
        emptyMessage={
          searchQuery 
            ? `🔍 No movies found for "${searchQuery}". Try different keywords or check spelling.` 
            : "🎭 Enter a search query to discover amazing movies from our vast collection."
        }
      />
    </div>
  );
};

export default Search;