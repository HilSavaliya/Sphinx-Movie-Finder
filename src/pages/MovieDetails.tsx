import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Star, Calendar, Clock, DollarSign, Play, Users, MapPin, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { ErrorBanner } from '@/components/ErrorBanner';
import { useMovies, type Movie } from '@/context/MovieContext';
import { useMovieDetails } from '@/hooks/useMovieApi';

const MovieDetails = () => {
  const { id } = useParams();
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovies();
  
  const movieId = id ? parseInt(id) : 0;
  const { data: movie, isLoading: loading, error } = useMovieDetails(movieId);
  
  const favorite = movie ? isFavorite(movie.id) : false;

  const handleFavoriteClick = () => {
    if (!movie) return;
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const handleWatchTrailer = () => {
    if (!movie) return;
    // Create YouTube search URL for movie trailer
    const searchQuery = encodeURIComponent(`${movie.title} trailer`);
    const youtubeUrl = `https://www.youtube.com/results?search_query=${searchQuery}`;
    window.open(youtubeUrl, '_blank');
  };

  // Validate movie ID
  if (!movieId || movieId <= 0) {
    return (
      <div className="space-y-6 mobile-optimized">
        <Button asChild variant="cinema-ghost">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <ErrorBanner message="Invalid movie ID provided" />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="mobile-optimized">
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="space-y-6 mobile-optimized">
        <Button asChild variant="cinema-ghost">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <ErrorBanner message={error?.message || "Movie not found or failed to load"} />
      </div>
    );
  }

  // Additional validation for movie data quality
  if (!movie.title || movie.title.includes('#') || movie.title.toLowerCase().includes('episode')) {
    return (
      <div className="space-y-6 mobile-optimized">
        <Button asChild variant="cinema-ghost">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Back to Movies
          </Link>
        </Button>
        <ErrorBanner message="This content appears to be a TV series episode, not a movie" />
      </div>
    );
  }

  const posterUrl = movie.poster_path 
    ? (movie.poster_path.startsWith('http') ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
    : '/placeholder-movie.jpg';

  const backdropUrl = movie.backdrop_path
    ? (movie.backdrop_path.startsWith('http') ? movie.backdrop_path : `https://image.tmdb.org/t/p/original${movie.backdrop_path}`)
    : (posterUrl);

  return (
    <div className="space-y-4 md:space-y-6 movie-details-mobile">
      {/* Back Button */}
      <Button asChild variant="cinema-ghost" className="touch-friendly">
        <Link to="/">
          <ArrowLeft className="h-4 w-4" />
          Back to Movies
        </Link>
      </Button>

      {/* Hero Section */}
      <div className="relative rounded-xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20" />
        
        <div className="relative p-4 md:p-8 lg:p-12">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Poster */}
            <div className="flex-shrink-0 flex justify-center lg:justify-start">
              <img
                src={posterUrl}
                alt={`${movie.title} poster`}
                className="movie-poster-mobile shadow-cinema"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-movie.jpg';
                }}
              />
            </div>

            {/* Movie Info */}
            <div className="flex-1 space-y-4 text-center lg:text-left">
              <div>
                <h1 className="mobile-title font-bold text-foreground mb-2">
                  {movie.title}
                </h1>
                {movie.tagline && (
                  <p className="text-lg md:text-xl text-muted-foreground italic mobile-text">
                    {movie.tagline}
                  </p>
                )}
              </div>

              {/* Rating and Actions */}
              <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4">
                <div className="flex items-center gap-1 bg-background/20 px-3 py-2 rounded-full backdrop-blur-sm">
                  <Star className="h-5 w-5 fill-current text-cinema-gold" />
                  <span className="text-lg font-semibold text-foreground">
                    {movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 'N/A'}
                  </span>
                  <span className="text-muted-foreground">/10</span>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={favorite ? "cinema" : "cinema-outline"}
                    onClick={handleFavoriteClick}
                    className="touch-friendly"
                    size="sm"
                  >
                    <Heart className={`h-4 w-4 ${favorite ? 'fill-current' : ''}`} />
                    <span className="hidden sm:inline">{favorite ? 'Favorited' : 'Favorite'}</span>
                  </Button>

                  <Button variant="cinema" onClick={handleWatchTrailer} className="touch-friendly" size="sm">
                    <Play className="h-4 w-4" />
                    <span className="hidden sm:inline">Trailer</span>
                  </Button>
                </div>
              </div>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {movie.genres.map(genre => (
                    <Badge key={genre.id} variant="secondary" className="mobile-text">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Overview */}
              <p className="mobile-text text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {movie.overview || 'No overview available for this movie.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="p-3 md:p-4 bg-gradient-card">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-cinema-gold" />
            <span className="font-semibold text-sm md:text-base">Release</span>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'Unknown'}
          </p>
        </Card>

        <Card className="p-3 md:p-4 bg-gradient-card">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-cinema-gold" />
            <span className="font-semibold text-sm md:text-base">Runtime</span>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            {movie.runtime && movie.runtime > 0 ? (
              <>
                {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
              </>
            ) : 'N/A'}
          </p>
        </Card>

        <Card className="p-3 md:p-4 bg-gradient-card">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-cinema-gold" />
            <span className="font-semibold text-sm md:text-base">Budget</span>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            {movie.budget && movie.budget > 0 ? `$${(movie.budget / 1_000_000).toFixed(1)}M` : 'N/A'}
          </p>
        </Card>

        <Card className="p-3 md:p-4 bg-gradient-card">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="h-4 w-4 text-cinema-gold" />
            <span className="font-semibold text-sm md:text-base">Revenue</span>
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            {movie.revenue && movie.revenue > 0 ? `$${(movie.revenue / 1_000_000).toFixed(1)}M` : 'N/A'}
          </p>
        </Card>
      </div>

      {/* Cast and Crew */}
      <div className="grid md:grid-cols-2 gap-8">
        {movie.director && (
          <Card className="p-6 bg-gradient-card">
            <h3 className="text-xl font-semibold mb-4">Director</h3>
            <p className="text-muted-foreground">{movie.director}</p>
          </Card>
        )}

        {movie.cast && (
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5 text-cinema-gold" />
              <h3 className="text-xl font-semibold">Cast</h3>
            </div>
            <div className="space-y-2">
              {movie.cast.slice(0, 4).map((actor, index) => (
                <div key={index} className="flex justify-between">
                  <span className="font-medium">{actor.name}</span>
                  <span className="text-muted-foreground">{actor.character}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>

      {/* Country and Cinema Times */}
      <div className="grid md:grid-cols-2 gap-8">
        {movie.production_countries && movie.production_countries.length > 0 && (
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-cinema-gold" />
              <h3 className="text-xl font-semibold">Production Country</h3>
            </div>
            <div className="space-y-2">
              {movie.production_countries.map((country, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-2xl">{country.iso_3166_1 === 'US' ? '🇺🇸' : 
                    country.iso_3166_1 === 'GB' ? '🇬🇧' : 
                    country.iso_3166_1 === 'FR' ? '🇫🇷' : 
                    country.iso_3166_1 === 'JP' ? '🇯🇵' : '🎬'}</span>
                  <span className="font-medium">{country.name}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {movie.cinema_release_periods && movie.cinema_release_periods.length > 0 && (
          <Card className="p-6 bg-gradient-card">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-cinema-gold" />
              <h3 className="text-xl font-semibold">Cinema Release History</h3>
            </div>
            <div className="space-y-3">
              {movie.cinema_release_periods.map((period, index) => (
                <div key={index} className="border-l-2 border-cinema-gold/30 pl-4">
                  <h4 className="font-medium text-foreground">{period.region}</h4>
                  <p className="text-muted-foreground text-sm">
                    {period.start_date} → {period.end_date}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;