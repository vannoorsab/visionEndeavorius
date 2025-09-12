import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { UserActivity } from '@/types';
import { generateCertificate, downloadCertificate } from '@/lib/certificateGenerator';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Eye, Award } from 'lucide-react';

export default function Certificates() {
  const { userProfile } = useAuth();
  const [completedActivities, setCompletedActivities] = useState<UserActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<UserActivity | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedActivities = async () => {
      if (!userProfile) return;

      try {
        const activitiesRef = collection(db, 'userActivities');
        const q = query(
          activitiesRef, 
          where('userId', '==', userProfile.uid),
          where('status', '==', 'completed')
        );
        const querySnapshot = await getDocs(q);
        
        const activities = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as UserActivity[];

        setCompletedActivities(activities);
        
        // Set first activity as default selected
        if (activities.length > 0) {
          setSelectedActivity(activities[0]);
        }
      } catch (error) {
        console.error('Error fetching completed activities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedActivities();
  }, [userProfile]);

  const handleDownloadCertificate = (activity?: UserActivity) => {
    if (!userProfile) return;
    
    const targetActivity = activity || selectedActivity;
    if (!targetActivity) return;

    downloadCertificate({
      userName: userProfile.displayName || userProfile.email,
      activityTitle: targetActivity.activityTitle,
      completedDate: new Date(targetActivity.joinedDate).toLocaleDateString()
    });
  };

  const handlePreviewCertificate = (activity: UserActivity) => {
    setSelectedActivity(activity);
  };

  if (!userProfile) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Your Certificates</h1>
        <p className="text-lg text-muted-foreground">Download and share your volunteering achievements</p>
      </div>
      
      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading your certificates...</p>
        </div>
      ) : completedActivities.length === 0 ? (
        <div className="text-center py-12">
          <Award className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold text-foreground mb-2">No Certificates Yet</h2>
          <p className="text-muted-foreground mb-6">Complete volunteering activities to earn certificates</p>
          <Button asChild>
            <a href="/explore">Explore Activities</a>
          </Button>
        </div>
      ) : (
        <>
          {/* Certificate Preview */}
          {selectedActivity && (
            <Card className="mb-8 p-8">
              <div className="certificate-border bg-white p-12 rounded-lg text-center border-8 border-primary">
                <div className="border-b-4 border-primary/20 pb-6 mb-6">
                  <h2 className="text-3xl font-bold text-primary mb-2">Certificate of Appreciation</h2>
                  <p className="text-lg text-muted-foreground">Vision Endeavours</p>
                </div>
                
                <div className="text-lg text-muted-foreground mb-6">
                  This is to certify that
                </div>
                
                <div className="text-4xl font-bold text-foreground mb-6" data-testid="text-certificate-user-name">
                  {userProfile.displayName || userProfile.email}
                </div>
                
                <div className="text-lg text-muted-foreground mb-2">
                  has successfully completed the volunteering activity
                </div>
                
                <div className="text-2xl font-semibold text-primary mb-8" data-testid="text-certificate-activity">
                  {selectedActivity.activityTitle}
                </div>
                
                <div className="flex justify-center items-center space-x-12 text-muted-foreground">
                  <div className="text-center">
                    <div className="border-t-2 border-muted pt-2">
                      <p className="font-medium">Date</p>
                      <p className="text-sm">{new Date(selectedActivity.joinedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-6xl text-primary/20">
                    🏆
                  </div>
                  <div className="text-center">
                    <div className="border-t-2 border-muted pt-2">
                      <p className="font-medium">Director</p>
                      <p className="text-sm">Vision Endeavours</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          )}
          
          {/* Certificate Actions */}
          {selectedActivity && (
            <div className="text-center mb-8">
              <Button 
                onClick={() => handleDownloadCertificate()}
                className="mr-4"
                data-testid="button-download-certificate"
              >
                <Download className="mr-2 h-4 w-4" />
                Download PDF
              </Button>
              <Button variant="secondary" asChild>
                <a href="/thankyou">Generate New Certificate</a>
              </Button>
            </div>
          )}
          
          {/* Available Certificates */}
          <Card>
            <CardContent>
              <div className="p-6 border-b border-border">
                <h2 className="text-xl font-semibold text-foreground">All Your Certificates</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4" data-testid="list-certificates">
                  {completedActivities.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mr-4">
                          <Award className="text-primary text-xl" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground" data-testid={`text-certificate-title-${activity.id}`}>
                            {activity.activityTitle}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Completed on {new Date(activity.joinedDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => handlePreviewCertificate(activity)}
                          data-testid={`button-preview-certificate-${activity.id}`}
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          Preview
                        </Button>
                        <Button 
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDownloadCertificate(activity)}
                          data-testid={`button-download-certificate-${activity.id}`}
                        >
                          <Download className="mr-1 h-4 w-4" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
