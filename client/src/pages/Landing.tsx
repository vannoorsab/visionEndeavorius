import { Link } from 'wouter';
import { UserPlus, LogIn } from 'lucide-react';

export default function Landing() {
  return (
    <>
      {/* Hero Section */}
      <div className="gradient-bg text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              🌍 Vision Endeavours
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              A platform where citizens can join meaningful activities, contribute to society, and earn certificates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <button 
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
                  data-testid="button-signup"
                >
                  <UserPlus className="mr-2 h-5 w-5" />
                  Sign Up
                </button>
              </Link>
              <Link href="/login">
                <button 
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
                  data-testid="button-login"
                >
                  <LogIn className="mr-2 h-5 w-5" />
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Make a Difference Today</h2>
            <p className="text-lg text-muted-foreground">Join our community of volunteers and create positive impact</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-card rounded-xl shadow-sm border border-border">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Meaningful Activities</h3>
              <p className="text-muted-foreground">Participate in impactful volunteering opportunities that make a real difference in your community.</p>
            </div>
            <div className="text-center p-8 bg-card rounded-xl shadow-sm border border-border">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📜</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Digital Certificates</h3>
              <p className="text-muted-foreground">Earn verified certificates for your volunteer work that you can share and download.</p>
            </div>
            <div className="text-center p-8 bg-card rounded-xl shadow-sm border border-border">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
              <p className="text-muted-foreground">Connect with like-minded individuals and collectively create positive change.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
