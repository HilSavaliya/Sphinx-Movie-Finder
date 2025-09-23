import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  overview: string;
  release_date: string;
  vote_average: number;
  genre_ids: number[];
  genres?: Array<{ id: number; name: string }>;
  runtime?: number;
  tagline?: string;
  budget?: number;
  revenue?: number;
  director?: string;
  cast?: Array<{ name: string; character: string }>;
  production_countries?: Array<{ iso_3166_1: string; name: string }>;
  cinema_release_periods?: Array<{ region: string; start_date: string; end_date: string }>;
}

export interface MovieFilters {
  genre: string;
  country: string;
  year: string;
  rating: string;
  sortBy: string;
}

interface MovieContextType {
  favorites: Movie[];
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isFavorite: (movieId: number) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filters: MovieFilters;
  setFilters: (filters: MovieFilters) => void;
  updateFilter: (key: keyof MovieFilters, value: string) => void;
  clearFilters: () => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovies = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};

const defaultFilters: MovieFilters = {
  genre: 'all',
  country: 'all',
  year: 'all',
  rating: 'all',
  sortBy: 'popularity'
};

export const MovieProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<MovieFilters>(defaultFilters);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFinder_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('movieFinder_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (movie: Movie) => {
    setFavorites(prev => [...prev.filter(f => f.id !== movie.id), movie]);
  };

  const removeFromFavorites = (movieId: number) => {
    setFavorites(prev => prev.filter(f => f.id !== movieId));
  };

  const isFavorite = (movieId: number) => {
    return favorites.some(f => f.id === movieId);
  };

  const updateFilter = (key: keyof MovieFilters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(defaultFilters);
  };

  return (
    <MovieContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        searchQuery,
        setSearchQuery,
        filters,
        setFilters,
        updateFilter,
        clearFilters,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};