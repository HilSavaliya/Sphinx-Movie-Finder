import React from 'react';
import { Heart, Star, Calendar, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useMovies, type Movie } from '@/context/MovieContext';
import { Link } from 'react-router-dom';

interface PremiumMovieCardProps {
  movie: Movie;
  className?: string;
}

export const PremiumMovieCard = ({ movie, className }: PremiumMovieCardProps) => {
  const { isFavorite, addToFavorites, removeFromFavorites } = useMovies();
  const isLiked = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const posterUrl = movie.poster_path 
    ? (movie.poster_path.startsWith('http') ? movie.poster_path : `https://image.tmdb.org/t/p/w500${movie.poster_path}`)
    : '/placeholder-movie.jpg';

  const releaseYear = movie.release_date ? new Date(movie.release_date).getFullYear() : NaN;
  const displayYear = Number.isNaN(releaseYear) ? 'TBA' : releaseYear;

  return (
    <Card className={`group relative overflow-hidden bg-gradient-card border-cinema-purple/20 hover:border-cinema-gold/50 transition-all duration-500 hover:shadow-cinema transform hover:scale-[1.02] ${className}`}>
      <Link to={`/movie/${movie.id}`} className="block">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img 
            src={posterUrl}
            alt={`${movie.title} poster`}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-movie.jpg';
            }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Premium Badge */}
          <div className="absolute top-3 left-3">
            <Badge className="bg-cinema-gold/90 text-black font-semibold text-xs px-2 py-1">
              HD
            </Badge>
          </div>
          
          {/* Rating */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="h-3 w-3 fill-cinema-gold text-cinema-gold" />
              <span className="text-white font-semibold text-xs">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
          </div>
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <Button size="lg" className="rounded-full h-14 w-14 bg-cinema-gold/90 hover:bg-cinema-gold text-black">
              <Play className="h-6 w-6 ml-1" />
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4 space-y-3">
          <div className="space-y-2">
            <h3 className="font-bold text-sm sm:text-base leading-tight line-clamp-2 text-foreground group-hover:text-cinema-gold transition-colors duration-300">
              {movie.title}
            </h3>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>{displayYear}</span>
              </div>
              
              {movie.genres && movie.genres.length > 0 && (
                <Badge variant="outline" className="text-xs border-cinema-purple/30 text-cinema-purple">
                  {movie.genres[0].name}
                </Badge>
              )}
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
            {movie.overview && movie.overview !== 'No overview available.' ? movie.overview : ''}
          </p>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs text-muted-foreground">Available</span>
              </div>
            </div>
            
            <Button
              variant="ghost" 
              size="sm"
              onClick={handleFavoriteClick}
              className="h-8 w-8 p-0 hover:bg-cinema-purple/20"
            >
              <Heart 
                className={`h-4 w-4 transition-all duration-300 ${
                  isLiked 
                    ? 'fill-cinema-red text-cinema-red scale-110' 
                    : 'text-muted-foreground hover:text-cinema-red hover:scale-110'
                }`} 
              />
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};