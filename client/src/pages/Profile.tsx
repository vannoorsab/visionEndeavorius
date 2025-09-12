import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '@/lib/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, Save, X } from 'lucide-react';

const VOLUNTEERING_INTERESTS = [
  { id: 'environment', label: 'Environment', icon: '🌱' },
  { id: 'health', label: 'Health', icon: '🏥' },
  { id: 'education', label: 'Education', icon: '👩‍🏫' },
  { id: 'community', label: 'Community Service', icon: '🤝' },
];

export default function Profile() {
  const { userProfile, updateUserProfile, updateUserPassword } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  const [formData, setFormData] = useState({
    displayName: '',
    dateOfBirth: '',
    interests: [] as string[],
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        displayName: userProfile.displayName || '',
        dateOfBirth: userProfile.dateOfBirth || '',
        interests: userProfile.interests || [],
      });
    }
  }, [userProfile]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleInterestChange = (interestId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      interests: checked 
        ? [...prev.interests, interestId]
        : prev.interests.filter(id => id !== interestId)
    }));
  };

  const handleImageUpload = async (file: File) => {
    if (!userProfile) return;

    try {
      const imageRef = ref(storage, `profileImages/${userProfile.uid}`);
      await uploadBytes(imageRef, file);
      const downloadURL = await getDownloadURL(imageRef);
      
      await updateUserProfile({ photoURL: downloadURL });
      toast({
        title: "Success",
        description: "Profile picture updated successfully",
      });
    } catch (error) {
      console.error('Image upload failed:', error);
      toast({
        title: "Error",
        description: "Failed to upload profile picture",
        variant: "destructive",
      });
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // Upload profile image if selected
      if (profileImage) {
        await handleImageUpload(profileImage);
      }
      
      // Update profile data
      await updateUserProfile(formData);
      
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword.length < 6) {
      toast({
        title: "Error",
        description: "New password must be at least 6 characters",
        variant: "destructive",
      });
      return;
    }

    try {
      setPasswordLoading(true);
      await updateUserPassword(passwordData.currentPassword, passwordData.newPassword);
      
      toast({
        title: "Success",
        description: "Password changed successfully",
      });
      
      setPasswordData({ currentPassword: '', newPassword: '' });
    } catch (error: any) {
      toast({
        title: "Error", 
        description: error.message || "Failed to change password",
        variant: "destructive",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  if (!userProfile) return null;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Card>
        <CardContent>
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-foreground">Profile Settings</h1>
            <p className="text-muted-foreground">Manage your account information and preferences</p>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleProfileSubmit} className="space-y-8">
              {/* Profile Picture */}
              <div className="text-center">
                <div className="relative inline-block">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={userProfile.photoURL} />
                    <AvatarFallback className="text-3xl bg-primary/10 text-primary">
                      {getInitials(userProfile.displayName || userProfile.email)}
                    </AvatarFallback>
                  </Avatar>
                  <label htmlFor="profile-picture" className="absolute bottom-0 right-0 bg-accent text-accent-foreground w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-accent/90 transition-colors cursor-pointer">
                    <Camera className="h-4 w-4" />
                  </label>
                  <input 
                    type="file" 
                    id="profile-picture" 
                    accept="image/*" 
                    className="hidden"
                    onChange={(e) => setProfileImage(e.target.files?.[0] || null)}
                    data-testid="input-profile-picture"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">Click the camera icon to upload a new profile picture</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
                  
                  <div>
                    <Label htmlFor="displayName">Full Name</Label>
                    <Input 
                      id="displayName"
                      value={formData.displayName}
                      onChange={(e) => handleInputChange('displayName', e.target.value)}
                      data-testid="input-display-name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email"
                      value={userProfile.email}
                      readOnly
                      className="bg-muted text-muted-foreground cursor-not-allowed"
                      data-testid="input-email"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Email cannot be changed</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input 
                      type="date"
                      id="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      data-testid="input-date-of-birth"
                    />
                  </div>
                </div>
                
                {/* Preferences */}
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-foreground">Volunteering Interests</h3>
                  
                  <div className="space-y-3">
                    {VOLUNTEERING_INTERESTS.map((interest) => (
                      <div key={interest.id} className="flex items-center space-x-3">
                        <Checkbox 
                          id={interest.id}
                          checked={formData.interests.includes(interest.id)}
                          onCheckedChange={(checked) => handleInterestChange(interest.id, !!checked)}
                          data-testid={`checkbox-interest-${interest.id}`}
                        />
                        <Label htmlFor={interest.id} className="flex items-center space-x-2 cursor-pointer">
                          <span className="text-lg">{interest.icon}</span>
                          <span>{interest.label}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button type="submit" disabled={loading} data-testid="button-save-profile">
                  <Save className="mr-2 h-4 w-4" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </Button>
              </div>
            </form>
            
            {/* Password Change */}
            <div className="border-t border-border pt-6 mt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Change Password</h3>
              <form onSubmit={handlePasswordSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input 
                      type="password"
                      id="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData(prev => ({...prev, currentPassword: e.target.value}))}
                      data-testid="input-current-password"
                    />
                  </div>
                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input 
                      type="password"
                      id="newPassword"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData(prev => ({...prev, newPassword: e.target.value}))}
                      data-testid="input-new-password"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setPasswordData({ currentPassword: '', newPassword: '' })}
                    data-testid="button-cancel-password"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                  </Button>
                  <Button type="submit" disabled={passwordLoading} data-testid="button-change-password">
                    {passwordLoading ? 'Changing...' : 'Change Password'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
