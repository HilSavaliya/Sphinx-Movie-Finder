import { useState } from 'react';
import { Settings, Download, Upload, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useMovies } from '@/context/MovieContext';

export const SettingsPanel = () => {
  const { favorites, addToFavorites } = useMovies();
  const [premiumMode, setPremiumMode] = useState(
    localStorage.getItem('movieFinder_premium') === 'true'
  );

  const handlePremiumToggle = () => {
    const newState = !premiumMode;
    setPremiumMode(newState);
    localStorage.setItem('movieFinder_premium', newState.toString());
  };

  const handleExportFavorites = () => {
    const dataStr = JSON.stringify(favorites, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `movie-favorites-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFavorites = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedMovies = JSON.parse(e.target?.result as string);
        if (Array.isArray(importedMovies)) {
          importedMovies.forEach(movie => addToFavorites(movie));
          alert(`Successfully imported ${importedMovies.length} movies!`);
        }
      } catch (error) {
        alert('Invalid file format. Please select a valid JSON file.');
      }
    };
    reader.readAsText(file);
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear all cached data?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="cinema-ghost" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4 space-y-4 glass-effect border-cinema-purple/30"
        align="end"
      >
        <h3 className="font-semibold text-lg gradient-text">Premium Settings</h3>
        
        {/* App Info */}
        <div className="space-y-3">
          <div className="bg-gradient-hero/10 rounded-lg p-4 border border-cinema-purple/20">
            <h4 className="font-semibold text-cinema-purple mb-2">Premium Features</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Advanced movie discovery</li>
              <li>• Smart recommendations</li>
              <li>• Offline favorites</li>
              <li>• Premium filtering</li>
            </ul>
          </div>
        </div>

        {/* Favorites Management */}
        <Card className="p-3 bg-gradient-card">
          <h4 className="font-medium mb-3">Favorites ({favorites.length})</h4>
          <div className="flex gap-2">
            <Button
              variant="cinema-outline"
              size="sm"
              onClick={handleExportFavorites}
              disabled={favorites.length === 0}
            >
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button
              variant="cinema-outline"
              size="sm"
              onClick={() => document.getElementById('import-favorites')?.click()}
            >
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <input
              id="import-favorites"
              type="file"
              accept=".json"
              onChange={handleImportFavorites}
              className="hidden"
            />
          </div>
        </Card>

        {/* Cache Management */}
        <Card className="p-3 bg-gradient-card">
          <h4 className="font-medium mb-3">Cache & Storage</h4>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleClearCache}
            className="w-full"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Data
          </Button>
        </Card>
      </PopoverContent>
    </Popover>
  );
};