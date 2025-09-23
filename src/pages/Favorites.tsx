import { MovieGrid } from '@/components/MovieGrid';
import { Button } from '@/components/ui/button';
import { useMovies } from '@/context/MovieContext';
import { Heart, Download, Upload } from 'lucide-react';
import { useRef } from 'react';

const Favorites = () => {
  const { favorites, addToFavorites } = useMovies();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const dataStr = JSON.stringify(favorites, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'movie-favorites.json';
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedMovies = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedMovies)) {
          importedMovies.forEach(movie => addToFavorites(movie));
        }
      } catch (error) {
        alert('Invalid file format. Please select a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h1 className="text-4xl font-bold gradient-text mb-2 flex items-center gap-2">
            <Heart className="h-8 w-8 text-cinema-red" />
            My Favorites
          </h1>
          <p className="text-muted-foreground">
            {favorites.length === 0 
              ? "You haven't added any favorites yet" 
              : `${favorites.length} favorite ${favorites.length === 1 ? 'movie' : 'movies'}`
            }
          </p>
        </div>

        {favorites.length > 0 && (
          <div className="flex gap-2">
            <Button variant="cinema-outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button 
              variant="cinema-outline" 
              size="sm" 
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </div>
        )}
      </div>
      
      <MovieGrid
        movies={favorites}
        emptyMessage="Add movies to your favorites by clicking the heart icon on any movie card."
      />
    </div>
  );
};

export default Favorites;