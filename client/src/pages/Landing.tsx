import { Link } from 'wouter';
import { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ArrowRight, 
  Leaf, 
  GraduationCap, 
  Heart, 
  Stethoscope, 
  ChevronLeft, 
  ChevronRight,
  Users,
  Award,
  Globe,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

export default function Landing() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(0);

  // Activities carousel data
  const activities = [
    {
      title: "Beach Cleanup Drive",
      description: "Join us in cleaning up our beautiful coastlines and protecting marine life.",
      image: "https://images.unsplash.com/photo-1586298237640-ea40a0bf6ee5?w=500&h=300&fit=crop",
      category: "Environment"
    },
    {
      title: "Children's Education Support",
      description: "Help underprivileged children access quality education and learning resources.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=500&h=300&fit=crop",
      category: "Education"
    },
    {
      title: "Community Food Bank",
      description: "Distribute meals and essential supplies to families in need.",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=500&h=300&fit=crop",
      category: "Community Service"
    },
    {
      title: "Health Awareness Campaign",
      description: "Promote health education and wellness in underserved communities.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
      category: "Health"
    }
  ];

  // Carousel auto-scroll
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [activities.length]);

  // Scroll animations
  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    document.querySelectorAll('.fade-in-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const nextActivity = () => {
    setCurrentActivity((prev) => (prev + 1) % activities.length);
  };

  const prevActivity = () => {
    setCurrentActivity((prev) => (prev - 1 + activities.length) % activities.length);
  };

  return (
    <div className="theme-landing min-h-screen">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <span className="text-2xl font-bold" style={{ color: 'var(--landing-primary)' }}>
                Vision Endeavours
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="landing-nav-link text-gray-700 hover:text-orange-500 font-medium py-2" data-testid="nav-home">
                Home
              </a>
              <a href="#about" className="landing-nav-link text-gray-700 hover:text-orange-500 font-medium py-2" data-testid="nav-about">
                About
              </a>
              <a href="#activities" className="landing-nav-link text-gray-700 hover:text-orange-500 font-medium py-2" data-testid="nav-activities">
                Activities
              </a>
              <a href="#contact" className="landing-nav-link text-gray-700 hover:text-orange-500 font-medium py-2" data-testid="nav-contact">
                Contact
              </a>
              
              <div className="flex items-center space-x-4 ml-8">
                <Link href="/login">
                  <button className="text-gray-700 hover:text-orange-500 font-medium" data-testid="nav-login">
                    Login
                  </button>
                </Link>
                <Link href="/signup">
                  <button 
                    className="landing-button px-6 py-2 rounded-full text-white font-medium"
                    style={{ backgroundColor: 'var(--landing-primary)' }}
                    data-testid="nav-signup"
                  >
                    Sign Up
                  </button>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-orange-500"
                data-testid="menu-toggle"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
                <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-orange-500" data-testid="mobile-nav-home">Home</a>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-orange-500" data-testid="mobile-nav-about">About</a>
                <a href="#activities" className="block px-3 py-2 text-gray-700 hover:text-orange-500" data-testid="mobile-nav-activities">Activities</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-orange-500" data-testid="mobile-nav-contact">Contact</a>
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <Link href="/login">
                    <button className="text-left text-gray-700 hover:text-orange-500" data-testid="mobile-nav-login">Login</button>
                  </Link>
                  <Link href="/signup">
                    <button 
                      className="landing-button px-4 py-2 rounded-full text-white font-medium text-left"
                      style={{ backgroundColor: 'var(--landing-primary)' }}
                      data-testid="mobile-nav-signup"
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-90"
          style={{
            background: `linear-gradient(135deg, var(--landing-primary) 0%, var(--landing-secondary) 100%)`
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fadeUp">
            <h1 className="landing-hero-title text-5xl md:text-7xl font-bold text-white mb-6 leading-tight" data-testid="hero-title">
              Transform Lives Through
              <span className="block text-white/90">Volunteering</span>
            </h1>
            <p className="landing-hero-subtitle text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed" data-testid="hero-subtitle">
              Join meaningful activities, contribute to society, earn verified certificates, and be part of a community making real change.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/signup">
                <button className="landing-button bg-white text-orange-500 px-8 py-4 rounded-full text-lg font-bold inline-flex items-center shadow-lg" data-testid="hero-signup">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
              <Link href="/login">
                <button className="landing-button border-2 border-white text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white hover:text-orange-500" data-testid="hero-login">
                  Welcome Back
                </button>
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center" data-testid="stat-volunteers">
                <div className="text-4xl font-bold text-white mb-2">1000+</div>
                <div className="text-white/80">Active Volunteers</div>
              </div>
              <div className="text-center" data-testid="stat-projects">
                <div className="text-4xl font-bold text-white mb-2">50+</div>
                <div className="text-white/80">Community Projects</div>
              </div>
              <div className="text-center" data-testid="stat-hours">
                <div className="text-4xl font-bold text-white mb-2">5000+</div>
                <div className="text-white/80">Hours Contributed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--landing-text)' }} data-testid="highlights-title">
              Make a Difference in Four Key Areas
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="highlights-subtitle">
              Choose from diverse volunteering opportunities that create lasting positive impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="landing-card-hover bg-white p-8 rounded-2xl shadow-lg text-center fade-in-on-scroll" data-testid="highlight-environment">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Leaf className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--landing-text)' }}>Environment</h3>
              <p className="text-gray-600">Protect our planet through conservation, cleanup drives, and sustainability initiatives.</p>
            </div>

            <div className="landing-card-hover bg-white p-8 rounded-2xl shadow-lg text-center fade-in-on-scroll" data-testid="highlight-education">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--landing-text)' }}>Education</h3>
              <p className="text-gray-600">Support learning initiatives and help provide quality education access for all.</p>
            </div>

            <div className="landing-card-hover bg-white p-8 rounded-2xl shadow-lg text-center fade-in-on-scroll" data-testid="highlight-community">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--landing-text)' }}>Community Service</h3>
              <p className="text-gray-600">Strengthen communities through outreach programs and social support initiatives.</p>
            </div>

            <div className="landing-card-hover bg-white p-8 rounded-2xl shadow-lg text-center fade-in-on-scroll" data-testid="highlight-health">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Stethoscope className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--landing-text)' }}>Health</h3>
              <p className="text-gray-600">Promote wellness and health awareness in underserved communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Carousel */}
      <section id="activities" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--landing-text)' }} data-testid="activities-title">
              Current Volunteering Activities
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto" data-testid="activities-subtitle">
              Discover ongoing opportunities to make a meaningful difference
            </p>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentActivity * 100}%)` }}
              >
                {activities.map((activity, index) => (
                  <div key={index} className="w-full flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                      <div className="md:flex">
                        <div className="md:w-1/2">
                          <img 
                            src={activity.image} 
                            alt={activity.title}
                            className="w-full h-64 md:h-full object-cover"
                            data-testid={`activity-image-${index}`}
                          />
                        </div>
                        <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                          <div className="inline-block px-3 py-1 bg-orange-100 text-orange-600 text-sm font-medium rounded-full mb-4 w-fit" data-testid={`activity-category-${index}`}>
                            {activity.category}
                          </div>
                          <h3 className="text-3xl font-bold mb-4" style={{ color: 'var(--landing-text)' }} data-testid={`activity-title-${index}`}>
                            {activity.title}
                          </h3>
                          <p className="text-gray-600 mb-6 text-lg leading-relaxed" data-testid={`activity-description-${index}`}>
                            {activity.description}
                          </p>
                          <Link href="/signup">
                            <button 
                              className="landing-button px-8 py-3 rounded-full text-white font-bold inline-flex items-center w-fit"
                              style={{ backgroundColor: 'var(--landing-primary)' }}
                              data-testid={`activity-join-${index}`}
                            >
                              Join This Activity
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button 
              onClick={prevActivity}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
              data-testid="carousel-prev"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button 
              onClick={nextActivity}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
              data-testid="carousel-next"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-2">
              {activities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentActivity(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentActivity ? 'bg-orange-500' : 'bg-gray-300'
                  }`}
                  data-testid={`carousel-indicator-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="fade-in-on-scroll">
              <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'var(--landing-text)' }} data-testid="about-title">
                About Vision Endeavours
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed" data-testid="about-description">
                We're a digital platform connecting passionate volunteers with meaningful opportunities to create positive change. Our mission is to make volunteering accessible, rewarding, and impactful for everyone.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="text-center" data-testid="about-stat-impact">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--landing-primary)' }}>25+</div>
                  <div className="text-gray-600">Countries Served</div>
                </div>
                <div className="text-center" data-testid="about-stat-partners">
                  <div className="text-3xl font-bold mb-2" style={{ color: 'var(--landing-primary)' }}>100+</div>
                  <div className="text-gray-600">Partner Organizations</div>
                </div>
              </div>

              <Link href="/signup">
                <button 
                  className="landing-button px-8 py-4 rounded-full text-white font-bold inline-flex items-center"
                  style={{ backgroundColor: 'var(--landing-primary)' }}
                  data-testid="about-join-btn"
                >
                  Join Our Mission
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>

            <div className="fade-in-on-scroll">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="landing-card-hover bg-white p-6 rounded-2xl shadow-lg">
                    <Users className="h-8 w-8 mb-4" style={{ color: 'var(--landing-primary)' }} />
                    <h3 className="font-bold mb-2" style={{ color: 'var(--landing-text)' }}>Community Focus</h3>
                    <p className="text-gray-600 text-sm">Building stronger communities through collaborative action.</p>
                  </div>
                  <div className="landing-card-hover bg-white p-6 rounded-2xl shadow-lg">
                    <Award className="h-8 w-8 mb-4" style={{ color: 'var(--landing-primary)' }} />
                    <h3 className="font-bold mb-2" style={{ color: 'var(--landing-text)' }}>Verified Impact</h3>
                    <p className="text-gray-600 text-sm">Earn certificates for your verified volunteer contributions.</p>
                  </div>
                </div>
                <div className="space-y-6 mt-8">
                  <div className="landing-card-hover bg-white p-6 rounded-2xl shadow-lg">
                    <Globe className="h-8 w-8 mb-4" style={{ color: 'var(--landing-primary)' }} />
                    <h3 className="font-bold mb-2" style={{ color: 'var(--landing-text)' }}>Global Reach</h3>
                    <p className="text-gray-600 text-sm">Connect with volunteers and projects worldwide.</p>
                  </div>
                  <div className="landing-card-hover bg-white p-6 rounded-2xl shadow-lg">
                    <Heart className="h-8 w-8 mb-4" style={{ color: 'var(--landing-primary)' }} />
                    <h3 className="font-bold mb-2" style={{ color: 'var(--landing-text)' }}>Purpose Driven</h3>
                    <p className="text-gray-600 text-sm">Find activities that align with your values and interests.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="py-16" style={{ backgroundColor: 'var(--landing-primary)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4" data-testid="footer-title">Vision Endeavours</h3>
              <p className="text-white/90 mb-6 leading-relaxed" data-testid="footer-description">
                Transform lives through volunteering. Join our community of changemakers and create lasting positive impact worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="landing-button text-white hover:text-orange-200" data-testid="social-facebook">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="#" className="landing-button text-white hover:text-orange-200" data-testid="social-twitter">
                  <Twitter className="h-6 w-6" />
                </a>
                <a href="#" className="landing-button text-white hover:text-orange-200" data-testid="social-instagram">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="#" className="landing-button text-white hover:text-orange-200" data-testid="social-linkedin">
                  <Linkedin className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4" data-testid="footer-nav-title">Navigation</h4>
              <ul className="space-y-2">
                <li><a href="#home" className="text-white/90 hover:text-white" data-testid="footer-nav-home">Home</a></li>
                <li><a href="#about" className="text-white/90 hover:text-white" data-testid="footer-nav-about">About</a></li>
                <li><a href="#activities" className="text-white/90 hover:text-white" data-testid="footer-nav-activities">Activities</a></li>
                <li><Link href="/signup" className="text-white/90 hover:text-white" data-testid="footer-nav-signup">Sign Up</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4" data-testid="footer-support-title">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/90 hover:text-white" data-testid="footer-support-help">Help Center</a></li>
                <li><a href="#" className="text-white/90 hover:text-white" data-testid="footer-support-contact">Contact Us</a></li>
                <li><a href="#" className="text-white/90 hover:text-white" data-testid="footer-support-privacy">Privacy Policy</a></li>
                <li><a href="#" className="text-white/90 hover:text-white" data-testid="footer-support-terms">Terms of Service</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/20 pt-8 text-center">
            <p className="text-white/90" data-testid="footer-copyright">
              © 2024 Vision Endeavours. All rights reserved. Making the world a better place, one volunteer at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}