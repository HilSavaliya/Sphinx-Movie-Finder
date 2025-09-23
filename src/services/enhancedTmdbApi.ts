import axios from 'axios';
import { type Movie } from '@/context/MovieContext';
import { mockMovies } from '@/data/mockMovies';

// Enhanced TMDB API with OMDb fallback and better error handling
const TMDB_API_KEY = '4d31f651669dfb4272d51237e40351cc';
const OMDB_API_KEY = 'dbb3a2af';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const OMDB_BASE_URL = 'https://www.omdbapi.com';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000, // 10 second timeout for better reliability
  params: {
    api_key: TMDB_API_KEY,
  },
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

const omdbApi = axios.create({
  baseURL: OMDB_BASE_URL,
  timeout: 8000, // 8 second timeout
  headers: {
    'Accept': 'application/json',
  },
});

// Add response interceptors for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('TMDB API Error:', error.message);
    return Promise.reject(error);
  }
);

omdbApi.interceptors.response.use(
  (response) => response,
  (error) => {
    console.warn('OMDb API Error:', error.message);
    return Promise.reject(error);
  }
);

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

// Fallback search using mock data
const fallbackSearch = (query: string): Movie[] => {
  return mockMovies.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase()) ||
    movie.overview.toLowerCase().includes(query.toLowerCase())
  );
};

// Fallback popular movies
const fallbackPopular = (): Movie[] => {
  return [...mockMovies]
    .filter(movie => movie.vote_average >= 7.0)
    .sort((a, b) => b.vote_average - a.vote_average);
};

// Fallback trending movies
const fallbackTrending = (): Movie[] => {
  return [...mockMovies].sort((a, b) => b.vote_average - a.vote_average);
};

// Transform OMDb movie to our Movie interface
const transformOMDbMovie = (omdbMovie: any): Movie => ({
  id: Number(omdbMovie.imdbID?.replace('tt', '')) || Math.floor(Math.random() * 1_000_000_000),
  title: omdbMovie.Title,
  poster_path: omdbMovie.Poster && omdbMovie.Poster !== 'N/A' ? omdbMovie.Poster : '/placeholder-movie.jpg',
  backdrop_path: undefined,
  overview: omdbMovie.Plot && omdbMovie.Plot !== 'N/A' ? omdbMovie.Plot : 'No overview available.',
  release_date: omdbMovie.Year ? `${omdbMovie.Year}-01-01` : '',
  vote_average: omdbMovie.imdbRating ? Number(omdbMovie.imdbRating) : 0,
  genre_ids: [],
  genres: omdbMovie.Genre ? omdbMovie.Genre.split(',').map((name: string, idx: number) => ({ id: idx + 1, name: name.trim() })) : undefined,
  runtime: omdbMovie.Runtime && omdbMovie.Runtime !== 'N/A' ? Number(String(omdbMovie.Runtime).replace(' min', '')) : undefined,
  tagline: undefined,
  budget: undefined,
  revenue: undefined,
  production_countries: undefined,
});

export const enhancedTmdbApi = {
  // Enhanced search with stricter filtering and better error handling
  searchMovies: async (query: string, page = 1): Promise<{ movies: Movie[]; totalPages: number; isFromCache: boolean }> => {
    try {
      console.log(`🔍 Searching for: "${query}"`);

      const response = await api.get('/search/movie', {
        params: { 
          query, 
          page, 
          include_adult: false,
          // Only movies, no TV shows
          primary_release_date_gte: '1900-01-01'
        }
      });

      console.log(`✅ TMDB search successful: ${response.data.results.length} results`);

      // Filter out obvious TV-like or invalid content only
      const validMovies = response.data.results.filter((movie: any) => {
        if (!movie.title) return false;
        const t = String(movie.title).toLowerCase();
        if (t.includes('#') || t.includes('episode') || t.includes('season')) return false;
        return true;
      });

      return {
        movies: validMovies.map(transformTMDBMovie),
        totalPages: response.data.total_pages,
        isFromCache: false
      };
    } catch (tmdbError) {
      console.warn('⚠️ TMDB search failed, trying OMDb...', tmdbError);

      try {
        const omdbResponse = await omdbApi.get('/', {
          params: { apikey: OMDB_API_KEY, s: query, type: 'movie', page }
        });

        if (omdbResponse.data?.Response === 'True' && Array.isArray(omdbResponse.data.Search)) {
          console.log(`✅ OMDb search successful: ${omdbResponse.data.Search.length} results`);
          
          // Filter valid movies from OMDb
          const validOmdbMovies = omdbResponse.data.Search.filter((m: any) => 
            m.Type === 'movie' && m.Title && !m.Title.includes('#') && m.Year
          );
          
          const movies = validOmdbMovies.map((m: any) => transformOMDbMovie(m));
          const totalResults = Number(omdbResponse.data.totalResults || 0);
          return {
            movies,
            totalPages: Math.max(1, Math.ceil(totalResults / 10)),
            isFromCache: false,
          };
        }

        console.warn('⚠️ OMDb search returned no results, falling back to mock.');
      } catch (omdbError) {
        console.warn('⚠️ OMDb search failed, using fallback data:', omdbError);
      }

      const fallbackResults = fallbackSearch(query);
      return {
        movies: fallbackResults,
        totalPages: 1,
        isFromCache: true
      };
    }
  },

  // Enhanced popular with fallback and better filtering
  getPopularMovies: async (page = 1): Promise<{ movies: Movie[]; totalPages: number; isFromCache: boolean }> => {
    try {
      console.log('🌟 Fetching popular movies...');

      const response = await api.get('/movie/popular', { 
        params: { 
          page,
          region: 'US' // Prefer US releases for better data quality
        } 
      });

      console.log(`✅ Popular movies fetched: ${response.data.results.length} results`);

      // Filter valid movies
      const validMovies = response.data.results.filter((movie: any) => 
        movie.title && movie.poster_path && movie.release_date && movie.overview
      );

      return {
        movies: validMovies.map(transformTMDBMovie),
        totalPages: response.data.total_pages,
        isFromCache: false
      };
    } catch (error) {
      console.warn('⚠️ Popular movies API failed, using fallback data:', error);

      const fallbackResults = fallbackPopular();
      return {
        movies: fallbackResults,
        totalPages: 1,
        isFromCache: true
      };
    }
  },

  // Enhanced trending with fallback
  getTrendingMovies: async (timeWindow = 'week', page = 1): Promise<{ movies: Movie[]; totalPages: number; isFromCache: boolean }> => {
    try {
      console.log('🔥 Fetching trending movies...');

      const response = await api.get(`/trending/movie/${timeWindow}`, { params: { page } });

      console.log(`✅ Trending movies fetched: ${response.data.results.length} results`);

      return {
        movies: response.data.results.map(transformTMDBMovie),
        totalPages: response.data.total_pages,
        isFromCache: false
      };
    } catch (error) {
      console.warn('⚠️ Trending movies API failed, using fallback data:', error);

      const fallbackResults = fallbackTrending();
      return {
        movies: fallbackResults,
        totalPages: 1,
        isFromCache: true
      };
    }
  },

  // Enhanced movie details with better error handling
  getMovieDetails: async (movieId: number): Promise<Movie> => {
    if (!movieId || movieId <= 0) {
      throw new Error('Invalid movie ID');
    }

    try {
      console.log(`🎬 Fetching details for movie ID: ${movieId}`);

      const movieResponse = await api.get(`/movie/${movieId}`, {
        params: { append_to_response: 'credits,release_dates,keywords' }
      });

      const movie = movieResponse.data;
      const credits = movieResponse.data.credits;

      // Validate this is actually a movie, not TV content
      if (movie.title?.includes('#') || 
          movie.title?.includes('Episode') ||
          movie.keywords?.keywords?.some((k: any) => k.name.toLowerCase().includes('tv'))) {
        throw new Error('Content appears to be TV series, not a movie');
      }

      console.log(`✅ Movie details fetched for: ${movie.title}`);

      const transformedMovie = {
        ...transformTMDBMovie(movie),
        director: credits.crew?.find((person: any) => person.job === 'Director')?.name,
        cast: credits.cast?.slice(0, 10).map((actor: any) => ({
          name: actor.name,
          character: actor.character
        })),
        // Include additional details from TMDB with proper validation
        budget: movie.budget && movie.budget > 0 ? movie.budget : undefined,
        revenue: movie.revenue && movie.revenue > 0 ? movie.revenue : undefined,
        runtime: movie.runtime && movie.runtime > 0 ? movie.runtime : undefined,
        tagline: movie.tagline || undefined,
        production_countries: movie.production_countries || undefined,
        cinema_release_periods: movie.release_dates?.results?.map((country: any) => ({
          region: country.iso_3166_1,
          start_date: country.release_dates?.[0]?.release_date ? new Date(country.release_dates[0].release_date).toLocaleDateString() : 'Unknown',
          end_date: 'Unknown' // TMDB doesn't provide end dates
        })) || [{ region: 'Global', start_date: movie.release_date, end_date: 'Unknown' }]
      };

      // Ensure we have essential data
      if (!transformedMovie.title || !transformedMovie.overview) {
        throw new Error('Incomplete movie data');
      }

      return transformedMovie;
    } catch (error) {
      console.warn(`⚠️ Movie details API failed for ID ${movieId}:`, error);

      // Only try OMDb for reasonable movie IDs (not random numbers)
      if (movieId < 10000000) {
        try {
          const imdbID = `tt${String(movieId).padStart(7, '0')}`;
          const omdbResp = await omdbApi.get('/', { 
            params: { apikey: OMDB_API_KEY, i: imdbID, type: 'movie' } 
          });
          
          if (omdbResp.data && omdbResp.data.Response === 'True' && omdbResp.data.Type === 'movie') {
            const d = omdbResp.data;
            const revenue = d.BoxOffice && d.BoxOffice !== 'N/A' ? 
              Number(d.BoxOffice.replace(/[^0-9]/g, '')) || undefined : undefined;
            const runtime = d.Runtime && d.Runtime !== 'N/A' ? 
              Number(String(d.Runtime).replace(' min', '')) || undefined : undefined;
            const countries = d.Country && d.Country !== 'N/A' ? 
              d.Country.split(',').map((name: string) => ({ 
                iso_3166_1: name.trim().slice(0,2).toUpperCase(), 
                name: name.trim() 
              })) : undefined;
            const cast = d.Actors && d.Actors !== 'N/A' ? 
              String(d.Actors).split(',').slice(0, 10).map((name: string) => ({ 
                name: name.trim(), 
                character: '' 
              })) : undefined;

            return {
              id: movieId,
              title: d.Title,
              poster_path: d.Poster && d.Poster !== 'N/A' ? d.Poster : '/placeholder-movie.jpg',
              backdrop_path: undefined,
              overview: d.Plot && d.Plot !== 'N/A' ? d.Plot : 'A compelling movie experience awaits.',
              release_date: d.Released && d.Released !== 'N/A' ? 
                new Date(d.Released).toISOString().slice(0,10) : '',
              vote_average: d.imdbRating ? Number(d.imdbRating) : 0,
              genre_ids: [],
              genres: d.Genre ? d.Genre.split(',').map((name: string, idx: number) => ({ 
                id: idx + 1, 
                name: name.trim() 
              })) : undefined,
              runtime,
              tagline: undefined,
              budget: undefined,
              revenue,
              director: d.Director && d.Director !== 'N/A' ? d.Director : undefined,
              cast,
              production_countries: countries,
              cinema_release_periods: countries ? countries.map(c => ({ 
                region: c.name, 
                start_date: d.Released || 'Unknown', 
                end_date: 'Unknown' 
              })) : undefined,
            };
          }
        } catch (omdbErr) {
          console.warn('⚠️ OMDb details fetch failed:', omdbErr);
        }
      }

      // Find in mock data as last resort
      const fallbackMovie = mockMovies.find(movie => movie.id === movieId);
      if (fallbackMovie) {
        console.log(`📚 Using fallback data for movie ID: ${movieId}`);
        return fallbackMovie;
      }

      throw new Error(`Movie with ID ${movieId} not found`);
    }
  },

  // Get movies by genre with fallback
  getMoviesByGenre: async (genreId: number, page = 1): Promise<{ movies: Movie[]; totalPages: number; isFromCache: boolean }> => {
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
        totalPages: response.data.total_pages,
        isFromCache: false,
      };
    } catch (error) {
      console.warn('⚠️ Movies by genre API failed, using fallback data:', error);
      const movies = mockMovies.filter(m => m.genre_ids?.includes(genreId));
      return {
        movies,
        totalPages: 1,
        isFromCache: true,
      };
    }
  },

  // Get top rated with fallback
  getTopRatedMovies: async (page = 1): Promise<{ movies: Movie[]; totalPages: number; isFromCache: boolean }> => {
    try {
      const response = await api.get('/movie/top_rated', { params: { page } });
      return {
        movies: response.data.results.map(transformTMDBMovie),
        totalPages: response.data.total_pages,
        isFromCache: false,
      };
    } catch (error) {
      console.warn('⚠️ Top rated API failed, using fallback data:', error);
      const movies = [...mockMovies].sort((a, b) => b.vote_average - a.vote_average);
      return {
        movies,
        totalPages: 1,
        isFromCache: true,
      };
    }
  },

  // Get movie genres (TMDB only)
  getGenres: async () => {
    try {
      const response = await api.get('/genre/movie/list');
      return response.data.genres;
    } catch (error) {
      console.warn('⚠️ Genres API failed, returning empty list');
      return [] as Array<{ id: number; name: string }>;
    }
  },
};

export default enhancedTmdbApi;