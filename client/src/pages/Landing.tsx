import { Link } from 'wouter';
import { UserPlus, LogIn, Heart, Users, Award, Globe, ArrowRight, CheckCircle } from 'lucide-react';

export default function Landing() {
  return (
    <>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-accent opacity-10 animate-pulse"></div>
        <div className="gradient-bg text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
            <div className="text-center max-w-5xl mx-auto">
              <div className="animate-bounce mb-8">
                <span className="text-8xl md:text-9xl">🌍</span>
              </div>
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
                Vision <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Endeavours</span>
              </h1>
              <p className="text-2xl md:text-3xl mb-4 text-white/95 font-medium">
                Transform Lives Through Volunteering
              </p>
              <p className="text-lg md:text-xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed">
                Join meaningful activities, contribute to society, earn verified certificates, and be part of a community making real change in the world.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <Link href="/signup">
                  <button 
                    className="group bg-accent hover:bg-accent/90 text-accent-foreground px-10 py-5 rounded-xl text-xl font-bold transition-all duration-300 inline-flex items-center shadow-2xl hover:shadow-accent/25 hover:scale-105 transform"
                    data-testid="button-signup"
                  >
                    <UserPlus className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                    Start Your Journey
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/login">
                  <button 
                    className="group bg-white/10 hover:bg-white/20 backdrop-blur-lg text-white border-2 border-white/30 hover:border-white/50 px-10 py-5 rounded-xl text-xl font-bold transition-all duration-300 inline-flex items-center hover:scale-105 transform"
                    data-testid="button-login"
                  >
                    <LogIn className="mr-3 h-6 w-6 group-hover:scale-110 transition-transform" />
                    Welcome Back
                  </button>
                </Link>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="text-4xl font-bold text-accent mb-2">1000+</div>
                  <div className="text-white/80">Active Volunteers</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-secondary mb-2">50+</div>
                  <div className="text-white/80">Community Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-white mb-2">5000+</div>
                  <div className="text-white/80">Hours Contributed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-gradient-to-b from-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Make a Difference Today
            </h2>
            <p className="text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Join our thriving community of changemakers and create lasting positive impact
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10 mb-20">
            <div className="group text-center p-10 bg-gradient-to-br from-card to-card/50 rounded-3xl shadow-xl hover:shadow-2xl border border-border/50 hover:border-primary/20 transition-all duration-500 hover:scale-105 transform">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-12 w-12 text-primary group-hover:text-secondary transition-colors" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">Meaningful Activities</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Participate in impactful volunteering opportunities that create real change in your community and beyond.</p>
            </div>
            
            <div className="group text-center p-10 bg-gradient-to-br from-card to-card/50 rounded-3xl shadow-xl hover:shadow-2xl border border-border/50 hover:border-secondary/20 transition-all duration-500 hover:scale-105 transform">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Award className="h-12 w-12 text-secondary group-hover:text-accent transition-colors" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-secondary transition-colors">Digital Certificates</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Earn verified certificates for your volunteer contributions that you can proudly share and download.</p>
            </div>
            
            <div className="group text-center p-10 bg-gradient-to-br from-card to-card/50 rounded-3xl shadow-xl hover:shadow-2xl border border-border/50 hover:border-accent/20 transition-all duration-500 hover:scale-105 transform">
              <div className="relative mb-8">
                <div className="w-24 h-24 bg-gradient-to-br from-accent/20 to-accent/10 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-12 w-12 text-accent group-hover:text-primary transition-colors" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-accent transition-colors">Community Impact</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">Connect with passionate changemakers and collectively create positive transformation worldwide.</p>
            </div>
          </div>
          
          {/* Call to Action */}
          <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 border border-primary/20">
            <Globe className="h-20 w-20 text-primary mx-auto mb-6" />
            <h3 className="text-4xl font-bold mb-4 text-foreground">
              Ready to Start Making an Impact?
            </h3>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of volunteers who are already changing the world, one activity at a time.
            </p>
            <Link href="/signup">
              <button className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-12 py-4 rounded-2xl text-lg font-bold transition-all duration-300 inline-flex items-center shadow-xl hover:shadow-2xl hover:scale-105 transform">
                <UserPlus className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
