export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  dateOfBirth?: string;
  interests: string[];
  joinedActivities: string[];
  completedActivities: string[];
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  icon: string;
  date: string;
  duration: string;
  volunteers: number;
  imageUrl: string;
}

export interface Certificate {
  id: string;
  userId: string;
  activityId: string;
  activityTitle: string;
  userName: string;
  completedDate: string;
  generatedDate: string;
}

export interface UserActivity {
  id: string;
  userId: string;
  activityId: string;
  activityTitle: string;
  joinedDate: string;
  status: 'joined' | 'completed';
  icon: string;
}
