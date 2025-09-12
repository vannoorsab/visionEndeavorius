import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'wouter';
import { LogOut, Home, User, Compass, Menu, X, Award } from 'lucide-react';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentUser, logout } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const isActive = (path: string) => {
    if (path === '/dashboard' && location === '/dashboard') return true;
    if (path === '/profile' && location === '/profile') return true;
    if (path === '/explore' && location === '/explore') return true;
    if (path === '/certificates' && location === '/certificates') return true;
    return false;
  };

  const showNavigation = currentUser && !['/login', '/signup'].includes(location);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white/95 backdrop-blur-lg shadow-lg border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 text-decoration-none group" onClick={closeMobileMenu}>
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🌍</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  Vision Endeavours
                </span>
                <div className="text-xs text-muted-foreground font-medium">Make a Difference</div>
              </div>
            </Link>
            
            {/* Desktop Navigation */}
            {showNavigation && (
              <>
                <div className="hidden md:flex items-center space-x-2">
                  <Link href="/dashboard" data-testid="nav-dashboard">
                    <button className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive('/dashboard') 
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:scale-105'
                    }`}>
                      <Home className="h-5 w-5 mr-2" />
                      Dashboard
                    </button>
                  </Link>
                  <Link href="/explore" data-testid="nav-explore">
                    <button className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive('/explore') 
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:scale-105'
                    }`}>
                      <Compass className="h-5 w-5 mr-2" />
                      Explore
                    </button>
                  </Link>
                  <Link href="/certificates" data-testid="nav-certificates">
                    <button className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive('/certificates') 
                        ? 'bg-primary text-primary-foreground shadow-lg scale-105' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:scale-105'
                    }`}>
                      <Award className="h-5 w-5 mr-2" />
                      Certificates
                    </button>
                  </Link>
                  <Link href="/profile" data-testid="nav-profile">
                    <button className={`flex items-center px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                      isActive('/profile') 
                        ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg scale-105' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-primary/10 hover:scale-105'
                    }`}>
                      <User className="h-5 w-5 mr-2" />
                      Profile
                    </button>
                  </Link>
                  
                  <div className="w-px h-8 bg-border mx-2"></div>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center px-4 py-2 rounded-xl font-medium text-destructive hover:bg-destructive/10 hover:scale-105 transition-all duration-300"
                    data-testid="button-logout"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </div>
                
                {/* Mobile menu button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-300"
                  data-testid="button-mobile-menu"
                >
                  {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
              </>
            )}
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {showNavigation && (
          <div className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="px-4 pt-2 pb-6 space-y-2 bg-white/98 backdrop-blur-lg border-t border-border/50">
              <Link href="/dashboard" data-testid="nav-mobile-dashboard">
                <button 
                  onClick={closeMobileMenu}
                  className={`w-full flex items-center px-4 py-3 rounded-xl font-medium text-left transition-all duration-300 ${
                    isActive('/dashboard') 
                      ? 'bg-primary text-primary-foreground shadow-lg scale-[1.02]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Home className="h-5 w-5 mr-3" />
                  Dashboard
                </button>
              </Link>
              <Link href="/explore" data-testid="nav-mobile-explore">
                <button 
                  onClick={closeMobileMenu}
                  className={`w-full flex items-center px-4 py-3 rounded-xl font-medium text-left transition-all duration-300 ${
                    isActive('/explore') 
                      ? 'bg-primary text-primary-foreground shadow-lg scale-[1.02]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Compass className="h-5 w-5 mr-3" />
                  Explore Activities
                </button>
              </Link>
              <Link href="/certificates" data-testid="nav-mobile-certificates">
                <button 
                  onClick={closeMobileMenu}
                  className={`w-full flex items-center px-4 py-3 rounded-xl font-medium text-left transition-all duration-300 ${
                    isActive('/certificates') 
                      ? 'bg-primary text-primary-foreground shadow-lg scale-[1.02]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Award className="h-5 w-5 mr-3" />
                  Certificates
                </button>
              </Link>
              <Link href="/profile" data-testid="nav-mobile-profile">
                <button 
                  onClick={closeMobileMenu}
                  className={`w-full flex items-center px-4 py-3 rounded-xl font-medium text-left transition-all duration-300 ${
                    isActive('/profile') 
                      ? 'bg-gradient-to-r from-primary to-primary/80 text-white shadow-lg scale-[1.02]' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <User className="h-5 w-5 mr-3" />
                  Profile Settings
                </button>
              </Link>
              
              <div className="pt-2 border-t border-border/50 mt-2">
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 rounded-xl font-medium text-left text-destructive hover:bg-destructive/10 transition-all duration-300"
                  data-testid="button-mobile-logout"
                >
                  <LogOut className="h-5 w-5 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {children}
    </div>
  );
}
