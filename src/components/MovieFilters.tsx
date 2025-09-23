import React from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { Badge } from '@/components/ui/badge';
import { useMovies } from '@/context/MovieContext';

const genres = [
  { id: '28', name: 'Action' },
  { id: '12', name: 'Adventure' },
  { id: '16', name: 'Animation' },
  { id: '35', name: 'Comedy' },
  { id: '80', name: 'Crime' },
  { id: '99', name: 'Documentary' },
  { id: '18', name: 'Drama' },
  { id: '10751', name: 'Family' },
  { id: '14', name: 'Fantasy' },
  { id: '36', name: 'History' },
  { id: '27', name: 'Horror' },
  { id: '10402', name: 'Music' },
  { id: '9648', name: 'Mystery' },
  { id: '10749', name: 'Romance' },
  { id: '878', name: 'Science Fiction' },
  { id: '10770', name: 'TV Movie' },
  { id: '53', name: 'Thriller' },
  { id: '10752', name: 'War' },
  { id: '37', name: 'Western' },
];

const countries = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'FR', name: 'France' },
  { code: 'DE', name: 'Germany' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'KR', name: 'South Korea' },
  { code: 'IN', name: 'India' },
  { code: 'CN', name: 'China' },
];

const years = Array.from({ length: 30 }, (_, i) => {
  const year = new Date().getFullYear() - i;
  return { value: year.toString(), label: year.toString() };
});

const ratings = [
  { value: '8', label: '8.0+ Outstanding' },
  { value: '7', label: '7.0+ Very Good' },
  { value: '6', label: '6.0+ Good' },
  { value: '5', label: '5.0+ Average' },
];

const sortOptions = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'vote_average', label: 'Highest Rated' },
  { value: 'release_date', label: 'Latest Release' },
  { value: 'revenue', label: 'Highest Grossing' },
];

export const MovieFilters = () => {
  const { filters, updateFilter, clearFilters } = useMovies();
  
  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value && value !== 'popularity' && value !== 'all').length;
  };

  const getGenreName = (id: string) => genres.find(g => g.id === id)?.name || '';
  const getCountryName = (code: string) => countries.find(c => c.code === code)?.name || '';

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="cinema-outline" size="sm" className="relative">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Filters</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 text-xs">
                {getActiveFiltersCount()}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 glass-effect border-cinema-purple/20 mobile-optimized" align="start">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold gradient-text">Movie Filters</h4>
              {getActiveFiltersCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 px-2 text-cinema-purple hover:text-cinema-gold"
                >
                  <X className="h-4 w-4" />
                  <span className="hidden sm:inline ml-1">Clear All</span>
                </Button>
              )}
            </div>

            <div className="grid gap-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Genre</label>
                <Select value={filters.genre} onValueChange={(value) => updateFilter('genre', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Genres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {genres.map((genre) => (
                      <SelectItem key={genre.id} value={genre.id}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Country</label>
                <Select value={filters.country} onValueChange={(value) => updateFilter('country', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="All Countries" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Countries</SelectItem>
                    {countries.map((country) => (
                      <SelectItem key={country.code} value={country.code}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">Year</label>
                  <Select value={filters.year} onValueChange={(value) => updateFilter('year', value)}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Year</SelectItem>
                      {years.map((year) => (
                        <SelectItem key={year.value} value={year.value}>
                          {year.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-muted-foreground mb-1 block">Rating</label>
                  <Select value={filters.rating} onValueChange={(value) => updateFilter('rating', value)}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Rating</SelectItem>
                      {ratings.map((rating) => (
                        <SelectItem key={rating.value} value={rating.value}>
                          {rating.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground mb-1 block">Sort By</label>
                <Select value={filters.sortBy} onValueChange={(value) => updateFilter('sortBy', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
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
      <div className="flex flex-wrap gap-1">
        {filters.genre && filters.genre !== 'all' && (
          <Badge variant="secondary" className="text-xs">
            {getGenreName(filters.genre)}
            <X 
              className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
              onClick={() => updateFilter('genre', 'all')}
            />
          </Badge>
        )}
        {filters.country && filters.country !== 'all' && (
          <Badge variant="secondary" className="text-xs">
            {getCountryName(filters.country)}
            <X 
              className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
              onClick={() => updateFilter('country', 'all')}
            />
          </Badge>
        )}
        {filters.year && filters.year !== 'all' && (
          <Badge variant="secondary" className="text-xs">
            {filters.year}
            <X 
              className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
              onClick={() => updateFilter('year', 'all')}
            />
          </Badge>
        )}
        {filters.rating && filters.rating !== 'all' && (
          <Badge variant="secondary" className="text-xs">
            {ratings.find(r => r.value === filters.rating)?.label.split(' ')[0]}+
            <X 
              className="h-3 w-3 ml-1 cursor-pointer hover:text-destructive" 
              onClick={() => updateFilter('rating', 'all')}
            />
          </Badge>
        )}
      </div>
    </div>
  );
};