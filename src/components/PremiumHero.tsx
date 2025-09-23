import React, { useEffect, useState } from 'react';
import { Play, Star, Calendar, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockMovies } from '@/data/mockMovies';

export const PremiumHero = () => {
  const [featuredMovie, setFeaturedMovie] = useState(mockMovies[0]);
  
  useEffect(() => {
    // Rotate featured movie every 10 seconds
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * Math.min(5, mockMovies.length));
      setFeaturedMovie(mockMovies[randomIndex]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const backdropUrl = featuredMovie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`
    : '/hero-cinema.jpg';

  return (
    <div className="relative h-[70vh] md:h-[80vh] overflow-hidden rounded-2xl bg-gradient-hero">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-2xl space-y-6">
            {/* Premium Badge */}
            <div className="flex items-center gap-3">
              <Badge className="bg-cinema-gold text-black font-bold px-4 py-2 text-sm">
                PREMIUM FEATURED
              </Badge>
              <div className="flex items-center gap-1 text-cinema-gold">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-semibold">{featuredMovie.vote_average.toFixed(1)}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="gradient-text">{featuredMovie.title}</span>
            </h1>

            {/* Movie Details */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(featuredMovie.release_date).getFullYear()}</span>
              </div>
              
              {featuredMovie.genres && featuredMovie.genres.length > 0 && (
                <div className="flex gap-2">
                  {featuredMovie.genres.slice(0, 2).map((genre) => (
                    <Badge 
                      key={genre.id} 
                      variant="outline" 
                      className="border-cinema-purple/50 text-cinema-purple bg-cinema-purple/10"
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Millions watching</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-lg text-muted-foreground leading-relaxed max-w-xl line-clamp-3">
              {featuredMovie.overview}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-cinema-gold hover:bg-cinema-gold/90 text-black font-bold gap-2 px-8 py-3 text-base rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <Play className="h-5 w-5 ml-1" />
                Watch Now
              </Button>
              
              <Button 
                variant="cinema-outline" 
                size="lg"
                className="font-semibold gap-2 px-6 py-3 text-base rounded-xl backdrop-blur-sm border-2"
              >
                More Info
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 right-8 hidden lg:block">
        <div className="w-32 h-32 rounded-full bg-gradient-hero opacity-20 animate-pulse" />
      </div>
      
      <div className="absolute top-20 right-20 hidden xl:block">
        <div className="w-16 h-16 rounded-full bg-cinema-gold opacity-30 animate-bounce" />
      </div>
    </div>
  );
};