import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Activity, UserActivity } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Clock, Users, CheckCircle } from 'lucide-react';

const ACTIVITIES: Activity[] = [
  {
    id: 'tree-plantation',
    title: 'Tree Plantation Drive',
    description: 'Join us in planting trees to combat climate change and improve air quality in our community. Make a lasting environmental impact.',
    icon: '🌱',
    date: 'March 25, 2024',
    duration: '4 hours',
    volunteers: 25,
    imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
  },
  {
    id: 'health-awareness',
    title: 'Health Awareness Campaign',
    description: 'Help spread awareness about health and wellness in underserved communities. Educate families about preventive care and healthy living.',
    icon: '🏥',
    date: 'March 30, 2024',
    duration: '6 hours',
    volunteers: 15,
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
  },
  {
    id: 'teaching-kids',
    title: 'Teaching Kids Program',
    description: 'Share your knowledge and help underprivileged children with their education. Make a difference in young minds and their future.',
    icon: '👩‍🏫',
    date: 'April 5, 2024',
    duration: '3 hours',
    volunteers: 12,
    imageUrl: 'https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
  },
  {
    id: 'environment-cleanup',
    title: 'Environment Cleanup',
    description: 'Join our community cleanup effort to remove litter and protect local wildlife. Help preserve our beautiful natural spaces for future generations.',
    icon: '♻️',
    date: 'April 10, 2024',
    duration: '5 hours',
    volunteers: 30,
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
  }
];

export default function Explore() {
  const { userProfile } = useAuth();
  const { toast } = useToast();
  const [joinedActivities, setJoinedActivities] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<string | null>(null);

  const joinActivity = async (activity: Activity) => {
    if (!userProfile) {
      toast({
        title: "Authentication Required",
        description: "Please login to join activities",
        variant: "destructive",
      });
      return;
    }

    if (joinedActivities.has(activity.id)) {
      toast({
        title: "Already Joined",
        description: "You have already joined this activity",
      });
      return;
    }

    try {
      setLoading(activity.id);
      
      const userActivity: Omit<UserActivity, 'id'> = {
        userId: userProfile.uid,
        activityId: activity.id,
        activityTitle: activity.title,
        joinedDate: new Date().toISOString(),
        status: 'joined',
        icon: activity.icon,
      };

      await addDoc(collection(db, 'userActivities'), userActivity);
      
      setJoinedActivities(prev => new Set(Array.from(prev).concat([activity.id])));
      
      toast({
        title: "Success!",
        description: `Successfully joined ${activity.title}! Check your dashboard to see your registered activities.`,
      });
    } catch (error) {
      console.error('Error joining activity:', error);
      toast({
        title: "Error",
        description: "Failed to join activity. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Explore Volunteering Activities</h1>
        <p className="text-lg text-muted-foreground">Find meaningful ways to contribute to your community</p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8" data-testid="grid-activities">
        {ACTIVITIES.map((activity) => (
          <Card key={activity.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <img 
              src={activity.imageUrl} 
              alt={activity.title}
              className="w-full h-48 object-cover"
            />
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{activity.icon}</span>
                <h3 className="text-xl font-bold text-foreground" data-testid={`text-activity-title-${activity.id}`}>
                  {activity.title}
                </h3>
              </div>
              <p className="text-muted-foreground mb-4">{activity.description}</p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {activity.date}
                  </span>
                  <span className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {activity.duration}
                  </span>
                  <span className="flex items-center">
                    <Users className="mr-1 h-4 w-4" />
                    {activity.volunteers} volunteers
                  </span>
                </div>
              </div>
              <Button 
                onClick={() => joinActivity(activity)}
                className="w-full"
                disabled={loading === activity.id || joinedActivities.has(activity.id)}
                data-testid={`button-join-activity-${activity.id}`}
              >
                {joinedActivities.has(activity.id) ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Joined
                  </>
                ) : (
                  <>
                    <Plus className="mr-2 h-4 w-4" />
                    {loading === activity.id ? 'Joining...' : 'Join Activity'}
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
