import { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  updateProfile
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { User as AppUser } from '@/types';

interface AuthContextType {
  currentUser: User | null;
  userProfile: AppUser | null;
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUserPassword: (currentPassword: string, newPassword: string) => Promise<void>;
  updateUserProfile: (data: Partial<AppUser>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Create user profile in Firestore
    const userProfile: AppUser = {
      uid: user.uid,
      email: user.email!,
      displayName: email.split('@')[0],
      interests: [],
      joinedActivities: [],
      completedActivities: []
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    await updateProfile(user, { displayName: userProfile.displayName });
  }

  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    setUserProfile(null);
    return await signOut(auth);
  }

  async function updateUserPassword(currentPassword: string, newPassword: string) {
    if (!currentUser) throw new Error('No user logged in');
    
    // Re-authenticate user first
    await signInWithEmailAndPassword(auth, currentUser.email!, currentPassword);
    await updatePassword(currentUser, newPassword);
  }

  async function updateUserProfile(data: Partial<AppUser>) {
    if (!currentUser) throw new Error('No user logged in');
    
    const userRef = doc(db, 'users', currentUser.uid);
    await updateDoc(userRef, data);
    
    // Update Firebase Auth profile if displayName changed
    if (data.displayName) {
      await updateProfile(currentUser, { displayName: data.displayName });
    }
    
    // Update local state
    setUserProfile(prev => prev ? { ...prev, ...data } : null);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        
        // Get user profile from Firestore
        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          setUserProfile(userSnap.data() as AppUser);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    userProfile,
    signup,
    login,
    logout,
    updateUserPassword,
    updateUserProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
