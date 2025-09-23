import React from 'react';
import { Filter, ChevronDown, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMovies } from '@/context/MovieContext';

const genres = [
  { value: 'all', label: 'All Genres' },
  { value: '28', label: 'Action' },
  { value: '12', label: 'Adventure' },
  { value: '16', label: 'Animation' },
  { value: '35', label: 'Comedy' },
  { value: '80', label: 'Crime' },
  { value: '99', label: 'Documentary' },
  { value: '18', label: 'Drama' },
  { value: '10751', label: 'Family' },
  { value: '14', label: 'Fantasy' },
  { value: '36', label: 'History' },
  { value: '27', label: 'Horror' },
  { value: '10402', label: 'Music' },
  { value: '9648', label: 'Mystery' },
  { value: '10749', label: 'Romance' },
  { value: '878', label: 'Sci-Fi' },
  { value: '10770', label: 'TV Movie' },
  { value: '53', label: 'Thriller' },
  { value: '10752', label: 'War' },
  { value: '37', label: 'Western' },
];

const years = [
  { value: 'all', label: 'All Years' },
  { value: '2025', label: '2025' },
  { value: '2024', label: '2024' },
  { value: '2023', label: '2023' },
  { value: '2022', label: '2022' },
  { value: '2021', label: '2021' },
  { value: '2020', label: '2020' },
  { value: '2019', label: '2019' },
  { value: '2018', label: '2018' },
  { value: '2017', label: '2017' },
  { value: '2016', label: '2016' },
  { value: '2015', label: '2015' },
];

const ratings = [
  { value: 'all', label: 'All Ratings' },
  { value: '9', label: '9.0+ ⭐' },
  { value: '8', label: '8.0+ ⭐' },
  { value: '7', label: '7.0+ ⭐' },
  { value: '6', label: '6.0+ ⭐' },
  { value: '5', label: '5.0+ ⭐' },
];

const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'release_date', label: 'Latest Release' },
  { value: 'title', label: 'A-Z Title' },
];

export const PremiumMovieFilters = () => {
  const { filters, updateFilter, clearFilters } = useMovies();

  const hasActiveFilters = filters.genre !== 'all' || 
                          filters.year !== 'all' || 
                          filters.rating !== 'all' || 
                          filters.sortBy !== 'popularity';

  const getFilterLabel = (type: string, value: string) => {
    const options = {
      genre: genres,
      year: years,
      rating: ratings,
      sortBy: sortOptions
    }[type];
    return options?.find(option => option.value === value)?.label || value;
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="cinema-outline" 
            size="sm" 
            className="h-9 gap-2 bg-card/50 backdrop-blur-sm hover:bg-cinema-purple/10"
          >
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filters</span>
            <ChevronDown className="h-3 w-3" />
            {hasActiveFilters && (
              <Badge className="ml-1 h-5 w-5 p-0 bg-cinema-gold text-black text-xs rounded-full flex items-center justify-center">
                !
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-80 p-4 glass-effect border-cinema-purple/30" align="center">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-foreground">Premium Filters</h4>
              {hasActiveFilters && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-7 text-xs text-muted-foreground hover:text-cinema-red"
                >
                  Clear All
                </Button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Genre</label>
                <Select value={filters.genre} onValueChange={(value) => updateFilter('genre', value)}>
                  <SelectTrigger className="h-9 text-sm bg-card/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-cinema-purple/30">
                    {genres.map((genre) => (
                      <SelectItem key={genre.value} value={genre.value} className="text-sm">
                        {genre.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Year</label>
                <Select value={filters.year} onValueChange={(value) => updateFilter('year', value)}>
                  <SelectTrigger className="h-9 text-sm bg-card/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-cinema-purple/30">
                    {years.map((year) => (
                      <SelectItem key={year.value} value={year.value} className="text-sm">
                        {year.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Rating</label>
                <Select value={filters.rating} onValueChange={(value) => updateFilter('rating', value)}>
                  <SelectTrigger className="h-9 text-sm bg-card/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-cinema-purple/30">
                    {ratings.map((rating) => (
                      <SelectItem key={rating.value} value={rating.value} className="text-sm">
                        {rating.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sort By</label>
                <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                  <SelectTrigger className="h-9 text-sm bg-card/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="glass-effect border-cinema-purple/30">
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-sm">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
      
      {/* Active Filter Badges */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-1">
          {filters.genre !== 'all' && (
            <Badge 
              variant="secondary" 
              className="h-7 text-xs bg-cinema-purple/20 text-cinema-purple border-cinema-purple/30 gap-1"
            >
              {getFilterLabel('genre', filters.genre)}
              <button onClick={() => updateFilter('genre', 'all')}>
                <X className="h-3 w-3 hover:text-cinema-red" />
              </button>
            </Badge>
          )}
          {filters.year !== 'all' && (
            <Badge 
              variant="secondary" 
              className="h-7 text-xs bg-cinema-blue/20 text-cinema-blue border-cinema-blue/30 gap-1"
            >
              {getFilterLabel('year', filters.year)}
              <button onClick={() => updateFilter('year', 'all')}>
                <X className="h-3 w-3 hover:text-cinema-red" />
              </button>
            </Badge>
          )}
          {filters.rating !== 'all' && (
            <Badge 
              variant="secondary" 
              className="h-7 text-xs bg-cinema-gold/20 text-cinema-gold border-cinema-gold/30 gap-1"
            >
              {getFilterLabel('rating', filters.rating)}
              <button onClick={() => updateFilter('rating', 'all')}>
                <X className="h-3 w-3 hover:text-cinema-red" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};