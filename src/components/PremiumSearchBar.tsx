import React from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMovies } from '@/context/MovieContext';

export const PremiumSearchBar = () => {
  const { searchQuery, setSearchQuery } = useMovies();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Navigate to search page when user starts typing
    if (value.trim() && window.location.pathname !== '/search') {
      navigate('/search');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate('/search');
    }
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  return (
    <div className="relative group">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-cinema-gold transition-colors duration-300" />
        <Input
          type="text"
          placeholder="Search premium movies, actors, directors..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="pl-10 pr-10 h-11 bg-card/50 backdrop-blur-sm border-cinema-purple/30 focus:border-cinema-gold focus:ring-cinema-gold/20 text-sm placeholder:text-muted-foreground/70 rounded-xl transition-all duration-300"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-cinema-purple/20 rounded-lg"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      
      {/* Search suggestions animation */}
      <div className="absolute inset-0 rounded-xl bg-gradient-hero opacity-0 group-focus-within:opacity-10 transition-opacity duration-300 pointer-events-none" />
    </div>
  );
};