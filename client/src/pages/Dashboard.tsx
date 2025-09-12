import { useEffect, useState } from 'react';
import { Link } from 'wouter';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserActivity } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Compass, Award, UserPen, HandHeart, Clock, Tag } from 'lucide-react';

export default function Dashboard() {
  const { userProfile } = useAuth();
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserActivities = async () => {
      if (!userProfile) return;

      try {
        const activitiesRef = collection(db, 'userActivities');
        const q = query(activitiesRef, where('userId', '==', userProfile.uid));
        const querySnapshot = await getDocs(q);
        
        const activities = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserActivity[];

        setUserActivities(activities);
      } catch (error) {
        console.error('Error fetching user activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserActivities();
  }, [userProfile]);

  const completedActivities = userActivities.filter(activity => activity.status === 'completed');
  const totalHours = completedActivities.length * 4; // Assuming 4 hours per activity

  if (!userProfile) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 p-8 rounded-xl text-white mb-8">
        <h1 className="text-3xl font-bold mb-2" data-testid="text-welcome">
          Welcome back, {userProfile.displayName || 'Volunteer'}! 👋
        </h1>
        <p className="text-white/90">Ready to make a difference in your community today?</p>
      </div>
      
      {/* Quick Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <HandHeart className="text-primary text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-foreground" data-testid="text-activities-count">
                  {userActivities.length}
                </p>
                <p className="text-sm text-muted-foreground">Activities Joined</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Tag className="text-primary text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-foreground" data-testid="text-certificates-count">
                  {completedActivities.length}
                </p>
                <p className="text-sm text-muted-foreground">Certificates Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <Clock className="text-primary text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-2xl font-bold text-foreground" data-testid="text-hours-volunteered">
                  {totalHours}
                </p>
                <p className="text-sm text-muted-foreground">Hours Volunteered</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Link href="/explore">
          <Button className="w-full h-auto p-6 bg-primary hover:bg-primary/90 text-primary-foreground flex-col space-y-2" data-testid="button-explore-activities">
            <Compass className="text-3xl" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">Explore Activities</h3>
              <p className="text-primary-foreground/80 text-sm">Find new volunteering opportunities</p>
            </div>
          </Button>
        </Link>
        
        <Link href="/certificates">
          <Button className="w-full h-auto p-6 bg-primary hover:bg-primary/90 text-primary-foreground flex-col space-y-2" data-testid="button-view-certificates">
            <Award className="text-3xl" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">View Certificates</h3>
              <p className="text-primary-foreground/80 text-sm">Download your achievements</p>
            </div>
          </Button>
        </Link>
        
        <Link href="/profile">
          <Button className="w-full h-auto p-6 bg-accent hover:bg-accent/90 text-accent-foreground flex-col space-y-2" data-testid="button-edit-profile">
            <UserPen className="text-3xl" />
            <div className="text-center">
              <h3 className="text-lg font-semibold">Edit Profile</h3>
              <p className="text-accent-foreground/80 text-sm">Update your information</p>
            </div>
          </Button>
        </Link>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardContent>
          <div className="p-6 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Your Joined Activities</h2>
          </div>
          <div className="p-6">
            {loading ? (
              <p className="text-muted-foreground">Loading your activities...</p>
            ) : userActivities.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">You haven't joined any activities yet.</p>
                <Link href="/explore">
                  <Button data-testid="button-explore-first-activity">
                    Explore Your First Activity
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4" data-testid="list-joined-activities">
                {userActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                        <span className="text-xl">{activity.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground" data-testid={`text-activity-title-${activity.id}`}>
                          {activity.activityTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Joined on {new Date(activity.joinedDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      activity.status === 'completed' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-primary/10 text-primary'
                    }`}>
                      {activity.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
