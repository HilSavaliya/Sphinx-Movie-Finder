import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Film, TrendingUp, Star, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: React.ReactNode;
}

export const MobileNav = ({ isOpen, onClose, trigger }: MobileNavProps) => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Film },
    { path: '/trending', label: 'Trending', icon: TrendingUp },
    { path: '/popular', label: 'Popular', icon: Star },
    { path: '/favorites', label: 'Favorites', icon: Heart },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetTrigger asChild>
        {trigger}
      </SheetTrigger>
      <SheetContent side="left" className="w-80 glass-effect border-cinema-purple/20 mobile-safe-area bg-card/95 backdrop-blur-xl">
        <SheetHeader className="text-left pb-4">
          <SheetTitle className="flex items-center gap-2 text-xl gradient-text">
            <Film className="h-6 w-6" />
            CinemaVault
          </SheetTitle>
        </SheetHeader>
        
        <nav className="mt-4">
          <div className="space-y-2">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Button
                key={path}
                asChild
                variant={location.pathname === path ? "cinema" : "cinema-ghost"}
                size="lg"
                className="w-full justify-start h-12 text-left"
                onClick={onClose}
              >
                <Link to={path} className="flex items-center gap-3">
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <div className="text-xs text-muted-foreground text-center leading-relaxed bg-card/50 rounded-lg p-3 backdrop-blur-sm border border-cinema-purple/20">
            <span className="gradient-text font-medium">CinemaVault Premium</span><br/>
            Discover amazing movies with advanced filters and seamless browsing experience
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};