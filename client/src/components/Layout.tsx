import { useAuth } from '@/contexts/AuthContext';
import { Link, useLocation } from 'wouter';
import { LogOut, Home, User, Compass } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentUser, logout } = useAuth();
  const [location] = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const showNavigation = currentUser && !['/login', '/signup'].includes(location);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-decoration-none">
              <span className="text-2xl">🌍</span>
              <span className="text-xl font-bold text-primary">Vision Endeavours</span>
            </Link>
            
            {showNavigation && (
              <div className="flex items-center space-x-4">
                <Link href="/dashboard" data-testid="nav-dashboard">
                  <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </button>
                </Link>
                <Link href="/profile" data-testid="nav-profile">
                  <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </button>
                </Link>
                <Link href="/explore" data-testid="nav-explore">
                  <button className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
                    <Compass className="h-4 w-4 mr-2" />
                    Explore
                  </button>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-destructive hover:text-destructive/80 transition-colors"
                  data-testid="button-logout"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
}
