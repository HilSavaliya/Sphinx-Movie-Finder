import { Link } from 'react-router-dom';
import { Heart, Star, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useMovies, type Movie } from '@/context/MovieContext';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export const MovieCard = ({ movie, className }: MovieCardProps) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovies();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const posterUrl = movie.poster_path 
    ? (movie.poster_path.startsWith('http') ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
    : '/placeholder-movie.jpg';

  // Ensure we have valid data before rendering
  if (!movie.title || !movie.id) {
    return null;
  }

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : 'TBA';
  const rating = movie.vote_average > 0 ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <Card className={cn(
      "movie-card-hover overflow-hidden bg-gradient-card border-border/50 w-full",
      "mobile-safe-area transition-all duration-300",
      className
    )}>
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={posterUrl}
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-movie.jpg';
            }}
          />
          
          {/* Mobile-optimized overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent 
                          opacity-0 hover:opacity-100 md:hover:opacity-100 transition-opacity duration-300
                          active:opacity-100 touch:opacity-100">
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
              <h3 className="text-white font-semibold text-sm md:text-lg mb-1 md:mb-2 line-clamp-2">
                {movie.title}
              </h3>
              {movie.overview && (
                <p className="text-white/80 text-xs md:text-sm line-clamp-2 md:line-clamp-3 mb-2 md:mb-3">
                  {movie.overview}
                </p>
              )}
              <div className="flex items-center justify-between text-xs md:text-sm">
                <span className="text-white/90 font-medium">{releaseYear}</span>
                <div className="flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full">
                  <Star className="h-3 w-3 md:h-4 md:w-4 fill-current text-cinema-gold" />
                  <span className="text-white font-medium">{rating}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Favorite Button - Mobile optimized */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute top-2 right-2 h-8 w-8 md:h-9 md:w-9 rounded-full",
              "bg-black/60 backdrop-blur-sm border border-white/20",
              "transition-all duration-200 hover:bg-black/80 hover:scale-110",
              "touch:bg-black/80 active:scale-95",
              favorite ? "text-cinema-red" : "text-white hover:text-cinema-red"
            )}
            onClick={handleFavoriteClick}
          >
            <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
          </Button>
        </div>
        
        {/* Mobile-optimized info section */}
        <div className="p-3 md:p-4">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-1 text-sm md:text-base">
            {movie.title}
          </h3>
          
          <div className="flex items-center justify-between text-xs md:text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3 md:h-4 md:w-4" />
              <span>{releaseYear}</span>
            </div>
            
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 md:h-4 md:w-4 fill-current text-cinema-gold" />
              <span>{rating}</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
};