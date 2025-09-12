import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ArrowLeft, UserCheck, Award, Heart } from 'lucide-react';

export default function ThankYou() {
  const handleSocialShare = (platform: string) => {
    const message = "I just completed a volunteering activity with Vision Endeavours! 🌍✨";
    const url = window.location.origin;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${message}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${message}&url=${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}&summary=${message}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4" data-testid="text-thank-you-title">
            Thank You for Volunteering!
          </h1>
          <p className="text-xl text-muted-foreground">Your certificate has been generated successfully</p>
        </div>
        
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Award className="text-2xl text-primary" />
              </div>
              <div className="text-left">
                <h3 className="text-xl font-semibold text-foreground">Certificate Ready!</h3>
                <p className="text-muted-foreground">Your volunteer achievement has been documented</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6 text-center">
              <div className="p-4 bg-muted/30 rounded-lg">
                <UserCheck className="mx-auto text-2xl text-primary mb-2" />
                <p className="text-sm text-muted-foreground">Profile Updated</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <Award className="mx-auto text-2xl text-secondary mb-2" />
                <p className="text-sm text-muted-foreground">Certificate Generated</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-lg">
                <Heart className="mx-auto text-2xl text-accent mb-2" />
                <p className="text-sm text-muted-foreground">Impact Created</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/certificates">
                <Button className="px-6 py-3" data-testid="button-download-certificate">
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button variant="secondary" className="px-6 py-3" data-testid="button-back-dashboard">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Share your achievement with the world!</p>
          <div className="flex justify-center space-x-4">
            <Button 
              size="icon"
              className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              onClick={() => handleSocialShare('facebook')}
              data-testid="button-share-facebook"
            >
              <span className="text-lg">f</span>
            </Button>
            <Button 
              size="icon"
              className="w-12 h-12 bg-blue-400 hover:bg-blue-500 text-white rounded-full"
              onClick={() => handleSocialShare('twitter')}
              data-testid="button-share-twitter"
            >
              <span className="text-lg">𝕏</span>
            </Button>
            <Button 
              size="icon"
              className="w-12 h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-full"
              onClick={() => handleSocialShare('linkedin')}
              data-testid="button-share-linkedin"
            >
              <span className="text-lg">in</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
