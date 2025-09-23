import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { enhancedTmdbApi } from '@/services/enhancedTmdbApi';
import { type Movie } from '@/context/MovieContext';

export const useMovieSearch = (query: string) => {
  return useQuery({
    queryKey: ['search', query],
    queryFn: () => enhancedTmdbApi.searchMovies(query),
    enabled: !!query.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1, // Only retry once to avoid long waits
  });
};

export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ['popular', page],
    queryFn: () => enhancedTmdbApi.getPopularMovies(page),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};

export const useTrendingMovies = (timeWindow = 'week', page = 1) => {
  return useQuery({
    queryKey: ['trending', timeWindow, page],
    queryFn: () => enhancedTmdbApi.getTrendingMovies(timeWindow, page),
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 1,
  });
};

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: ['movie', movieId],
    queryFn: () => enhancedTmdbApi.getMovieDetails(movieId),
    enabled: !!movieId,
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });
};

export const useMoviesByGenre = (genreId: number, page = 1) => {
  return useQuery({
    queryKey: ['genre', genreId, page],
    queryFn: () => enhancedTmdbApi.getMoviesByGenre(genreId, page),
    enabled: !!genreId,
    staleTime: 15 * 60 * 1000, // 15 minutes
    retry: 1,
  });
};

export const useTopRatedMovies = (page = 1) => {
  return useQuery({
    queryKey: ['topRated', page],
    queryFn: () => enhancedTmdbApi.getTopRatedMovies(page),
    staleTime: 30 * 60 * 1000, // 30 minutes
    retry: 1,
  });
};

export const useGenres = () => {
  return useQuery({
    queryKey: ['genres'],
    queryFn: () => enhancedTmdbApi.getGenres(),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

// Custom hook for advanced movie filtering and searching
export const useAdvancedMovieSearch = () => {
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchMovies = async (query: string, filters?: {
    genre?: number;
    year?: number;
    minRating?: number;
    sortBy?: string;
  }) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { movies } = await enhancedTmdbApi.searchMovies(query);
      
      let filteredMovies = movies;

      // Apply filters
      if (filters) {
        if (filters.minRating) {
          filteredMovies = filteredMovies.filter(movie => movie.vote_average >= filters.minRating!);
        }
        
        if (filters.year) {
          filteredMovies = filteredMovies.filter(movie => {
            const releaseYear = new Date(movie.release_date).getFullYear();
            return releaseYear === filters.year;
          });
        }

        if (filters.genre) {
          filteredMovies = filteredMovies.filter(movie => 
            movie.genre_ids.includes(filters.genre!)
          );
        }

        // Sort results
        if (filters.sortBy) {
          switch (filters.sortBy) {
            case 'rating':
              filteredMovies.sort((a, b) => b.vote_average - a.vote_average);
              break;
            case 'release_date':
              filteredMovies.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime());
              break;
            case 'title':
              filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
              break;
            default:
              // Keep original order (popularity)
              break;
          }
        }
      }

      setSearchResults(filteredMovies);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to search movies');
    } finally {
      setLoading(false);
    }
  };

  return { searchResults, loading, error, searchMovies };
};