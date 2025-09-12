import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const isEmailValid = email.includes('@') && email.includes('.');
  const isPasswordValid = password.length >= 6;
  const canSubmit = isEmailValid && isPasswordValid && !loading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) {
      toast({
        title: "Validation Error",
        description: "Please check your email and password",
        variant: "destructive",
      });
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      toast({
        title: "Welcome back!",
        description: "Login successful! Redirecting to your dashboard...",
      });
      setLocation('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Invalid email or password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-2xl animate-pulse">
            <LogIn className="h-10 w-10 text-white" />
          </div>
          <h2 className="mt-6 text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">Sign in to continue your volunteering journey</p>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-lg shadow-2xl border-white/50">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-semibold text-foreground flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-primary" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    className={`pl-4 pr-12 py-3 text-base rounded-xl transition-all duration-200 ${
                      emailTouched && isEmailValid ? 'border-green-500 focus:ring-green-500/20 bg-green-50/50' :
                      emailTouched && !isEmailValid ? 'border-destructive focus:ring-destructive/20 bg-destructive/5' :
                      'focus:ring-primary/20 focus:border-primary'
                    }`}
                    placeholder="Enter your email address"
                    data-testid="input-login-email"
                    required
                  />
                  {emailTouched && (
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                      {isEmailValid ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                  )}
                </div>
                {emailTouched && !isEmailValid && (
                  <p className="text-sm text-destructive mt-1 animate-in slide-in-from-top-1 duration-200">
                    Please enter a valid email address
                  </p>
                )}
              </div>
              
              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold text-foreground flex items-center">
                  <Lock className="h-4 w-4 mr-2 text-primary" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => setPasswordTouched(true)}
                    className={`pl-4 pr-12 py-3 text-base rounded-xl transition-all duration-200 ${
                      passwordTouched && isPasswordValid ? 'border-green-500 focus:ring-green-500/20 bg-green-50/50' :
                      passwordTouched && !isPasswordValid ? 'border-destructive focus:ring-destructive/20 bg-destructive/5' :
                      'focus:ring-primary/20 focus:border-primary'
                    }`}
                    placeholder="Enter your password"
                    data-testid="input-login-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                    data-testid="button-toggle-password"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {passwordTouched && !isPasswordValid && (
                  <p className="text-sm text-destructive mt-1 animate-in slide-in-from-top-1 duration-200">
                    Password must be at least 6 characters long
                  </p>
                )}
              </div>
              
              <Button
                type="submit"
                disabled={!canSubmit}
                className={`w-full py-4 text-lg font-bold rounded-xl transition-all duration-300 transform ${
                  canSubmit
                    ? 'bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                data-testid="button-login-submit"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="mr-2 h-5 w-5" />
                    Sign In to Continue
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-muted-foreground font-medium">Don't have an account?</span>
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <Link href="/signup">
                  <button className="group font-bold text-lg bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent hover:scale-105 transition-all duration-300" data-testid="link-signup">
                    Create a new account
                    <span className="block w-0 group-hover:w-full transition-all duration-300 h-0.5 bg-gradient-to-r from-secondary to-accent mt-1 mx-auto"></span>
                  </button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
