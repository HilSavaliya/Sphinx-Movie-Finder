import axios from 'axios';
import { type Movie } from '@/context/MovieContext';

// TMDB API Configuration
const API_KEY = '4d31f651669dfb4272d51237e40351cc'; // User-provided key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

// Transform TMDB response to our Movie interface
const transformTMDBMovie = (tmdbMovie: any): Movie => ({
  id: tmdbMovie.id,
  title: tmdbMovie.title,
  poster_path: tmdbMovie.poster_path ? `${IMAGE_BASE_URL}/w500${tmdbMovie.poster_path}` : '/placeholder-movie.jpg',
  backdrop_path: tmdbMovie.backdrop_path ? `${IMAGE_BASE_URL}/w1280${tmdbMovie.backdrop_path}` : undefined,
  overview: tmdbMovie.overview,
  release_date: tmdbMovie.release_date,
  vote_average: tmdbMovie.vote_average,
  genre_ids: tmdbMovie.genre_ids || [],
  genres: tmdbMovie.genres?.map((g: any) => ({ id: g.id, name: g.name })),
  runtime: tmdbMovie.runtime,
  tagline: tmdbMovie.tagline,
  budget: tmdbMovie.budget,
  revenue: tmdbMovie.revenue,
  production_countries: tmdbMovie.production_countries,
});

export const tmdbApi = {
  // Search movies
  searchMovies: async (query: string, page = 1): Promise<{ movies: Movie[]; totalPages: number }> => {
    try {
      const response = await api.get('/search/movie', {
        params: { query, page, include_adult: false }
      });
      
      return {
        movies: response.data.results.map(transformTMDBMovie),
        totalPages: response.data.total_pages
      };
    } catch (error) {
      console.error('Error searching movies:', error);
      throw new Error('Failed to search movies');
    }
  },

  // Get popular movies
  getPopularMovies: async (page = 1): Promise<{ movies: Movie[]; totalPages: number }> => {
    try {
      const response = await api.get('/movie/popular', { params: { page } });
      
      return {
        movies: response.data.results.map(transformTMDBMovie),
        totalPages: response.data.total_pages
      };
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw new Error('Failed to fetch popular movies');
    }
  },

  // Get trending movies
  getTrendingMovies: async (timeWindow = 'week', page = 1): Promise<{ movies: Movie[]; totalPages: number }> => {
    try {
      const response = await api.get(`/trending/movie/${timeWindow}`, { params: { page } });
      
      return {
        movies: response.data.results.map(transformTMDBMovie),
        totalPages: response.data.total_pages
      };
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      throw new Error('Failed to fetch trending movies');
    }
  },

  // Get movie details
  getMovieDetails: async (movieId: number): Promise<Movie> => {
    try {
      const [movieResponse, creditsResponse] = await Promise.all([
        api.get(`/movie/${movieId}`),
        api.get(`/movie/${movieId}/credits`)
      ]);

      const movie = movieResponse.data;
      const credits = creditsResponse.data;

      return {
        ...transformTMDBMovie(movie),
        director: credits.crew?.find((person: any) => person.job === 'Director')?.name,
        cast: credits.cast?.slice(0, 10).map((actor: any) => ({
          name: actor.name,
          character: actor.character
        }))
      };
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw new Error('Failed to fetch movie details');
    }
  },

  // Get movies by genre
  getMoviesByGenre: async (genreId: number, page = 1): Promise<{ movies: Movie[]; totalPages: number }> => {
    try {
      const response = await api.get('/discover/movie', {
        params: { 
          with_genres: genreId, 
          page,
          sort_by: 'popularity.desc'
        }
      });
      
      return {
        movies: response.data.results.map(transformTMDBMovie),
        totalPages: response.data.total_pages
      };
    } catch (error) {
      console.error('Error fetching movies by genre:', error);
      throw new Error('Failed to fetch movies by genre');
    }
  },

  // Get top rated movies
  getTopRatedMovies: async (page = 1): Promise<{ movies: Movie[]; totalPages: number }> => {
    try {
      const response = await api.get('/movie/top_rated', { params: { page } });
      
      return {
        movies: response.data.results.map(transformTMDBMovie),
        totalPages: response.data.total_pages
      };
    } catch (error) {
      console.error('Error fetching top rated movies:', error);
      throw new Error('Failed to fetch top rated movies');
    }
  },

  // Get movie genres
  getGenres: async () => {
    try {
      const response = await api.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw new Error('Failed to fetch genres');
    }
  }
};

export default tmdbApi;