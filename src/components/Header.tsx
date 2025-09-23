import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, Film, TrendingUp, Star, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PremiumSearchBar } from './PremiumSearchBar';
import { SettingsPanel } from './SettingsPanel';
import { PremiumMovieFilters } from './PremiumMovieFilters';
import { MobileNav } from './MobileNav';
import { ThemeToggle } from './ThemeToggle';
import { EnhancedMobileHeader } from './EnhancedMobileHeader';
import { useIsMobile } from '@/hooks/use-mobile';

export const Header = () => {
  // ALL HOOKS MUST BE AT THE TOP - Rules of Hooks
  const isMobile = useIsMobile();
  const location = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Home', icon: Film },
    { path: '/trending', label: 'Trending', icon: TrendingUp },
    { path: '/popular', label: 'Popular', icon: Star },
    { path: '/favorites', label: 'Favorites', icon: Heart },
  ];

  // Use enhanced mobile header for mobile devices (after all hooks)
  if (isMobile) {
    return <EnhancedMobileHeader />;
  }

  return (
    <header className="sticky top-0 z-50 glass-effect border-b border-cinema-purple/20 backdrop-blur-xl">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Main Header Row */}
        <div className="flex items-center justify-between gap-4 py-3 lg:py-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-xl lg:text-2xl font-bold gradient-text flex-shrink-0"
          >
            <div className="p-2 rounded-xl bg-gradient-hero">
              <Film className="h-6 w-6 lg:h-8 lg:w-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base lg:text-xl leading-none">CinemaVault</span>
              <span className="text-xs text-muted-foreground/70 font-normal">Premium Movies</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                asChild
                variant={location.pathname === path ? "cinema" : "cinema-ghost"}
                size="sm"
                className="transition-all duration-300"
              >
                <Link to={path} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </Button>
            ))}
          </nav>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-4">
            <PremiumSearchBar />
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <PremiumMovieFilters />
            <ThemeToggle />
            <SettingsPanel />
          </div>
        </div>

        {/* Tablet Navigation */}
        <nav className="lg:hidden pb-3 border-t border-cinema-purple/10 pt-3">
          <div className="flex justify-center gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                asChild
                variant={location.pathname === path ? "cinema" : "cinema-ghost"}
                size="sm"
                className="transition-all duration-300 whitespace-nowrap"
              >
                <Link to={path} className="flex items-center gap-2">
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
};