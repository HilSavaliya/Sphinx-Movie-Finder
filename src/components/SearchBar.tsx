import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMovies } from '@/context/MovieContext';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { setSearchQuery } = useMovies();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchQuery(query.trim());
      navigate('/search');
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 bg-muted/50 border-border/50 focus:border-primary"
        />
      </div>
      <Button type="submit" variant="cinema" size="sm">
        Search
      </Button>
    </form>
  );
};