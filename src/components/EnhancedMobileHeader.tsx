import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Film, Search, X, TrendingUp, Star, Heart, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from './ThemeToggle';
import { SettingsPanel } from './SettingsPanel';
import { useMovies } from '@/context/MovieContext';
import { useNavigate } from 'react-router-dom';

export const EnhancedMobileHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery } = useMovies();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [showSearch, setShowSearch] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Home, badge: null },
    { path: '/trending', label: 'Trending', icon: TrendingUp, badge: 'Hot' },
    { path: '/popular', label: 'Popular', icon: Star, badge: null },
    { path: '/favorites', label: 'Favorites', icon: Heart, badge: null },
  ];

  const handleSearch = () => {
    if (localQuery.trim()) {
      setSearchQuery(localQuery.trim());
      navigate('/search');
      setShowSearch(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b border-border/50 mobile-safe-area">
      <div className="container mx-auto px-3 py-2">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-3">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2 h-9 w-9">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 bg-card/95 backdrop-blur-xl">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-3 pb-6 border-b border-border/20">
                  <div className="p-2 rounded-xl bg-gradient-hero">
                    <Film className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-bold text-lg gradient-text">CinemaVault</h2>
                    <p className="text-xs text-muted-foreground">Premium Movie Discovery</p>
                  </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-6 space-y-2">
                  {navItems.map(({ path, label, icon: Icon, badge }) => (
                    <SheetClose asChild key={path}>
                      <Link
                        to={path}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                          location.pathname === path
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'hover:bg-muted/50 text-foreground/80 hover:text-foreground'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span className="font-medium">{label}</span>
                        {badge && (
                          <Badge variant="secondary" className="ml-auto text-xs bg-cinema-gold/20 text-cinema-gold">
                            {badge}
                          </Badge>
                        )}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Footer */}
                <div className="pt-6 border-t border-border/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Theme</span>
                    <ThemeToggle />
                  </div>
                  <SettingsPanel />
                </div>
              </div>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 font-bold gradient-text text-lg flex-1"
          >
            <div className="p-1.5 rounded-lg bg-gradient-hero">
              <Film className="h-5 w-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm leading-none">CinemaVault</span>
              <span className="text-xs text-muted-foreground/70 font-normal">Premium Movies</span>
            </div>
          </Link>

          {/* Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSearch(!showSearch)}
            className="p-2 h-9 w-9"
          >
            {showSearch ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
          </Button>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="mt-3 animate-in slide-up-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search movies, actors, directors..."
                value={localQuery}
                onChange={(e) => setLocalQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 pr-20 h-11 bg-muted/30 border-border/50 focus:border-primary rounded-xl"
                autoFocus
              />
              <Button
                onClick={handleSearch}
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-9 px-4"
              >
                Search
              </Button>
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="mt-3 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max px-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                  location.pathname === path
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-muted/30 text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};