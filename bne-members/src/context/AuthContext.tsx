import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth, db, loginWithGoogle, getOAuthLoginUrl } from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
interface DbUser {
  email: string;
  role: 'member' | 'admin';
  status: 'active' | 'suspended' | 'archived';
  persona?: string;
  contactInfo?: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  dbUser: DbUser | null;
  loading: boolean;
  login: () => Promise<void>;
  setOverrideUser: (uid: string | null) => Promise<void>;
  isSpoofing: boolean;
  authError: string | null;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [dbUser, setDbUser] = useState<DbUser | null>(null);
  const [spoofUid, setSpoofUid] = useState<string | null>(null);
  const [spoofDbUser, setSpoofDbUser] = useState<DbUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  // Check for OAuth session on mount
  useEffect(() => {
    const checkOauthSession = async () => {
      try {
        const res = await fetch('/api/oauth/session');
        if (res.ok) {
          const session = await res.json();
          if (session.authenticated) {
            // OAuth session exists - set a virtual user
            // The main server (not Firebase) handles the session
            setUser({ 
              uid: session.openId, 
              email: session.email,
              displayName: session.name 
            } as User);
          }
        }
      } catch (e) {
        // Session check failed silently - might be running standalone
      }
    };
    
    checkOauthSession();
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        try {
          const docRef = doc(db, 'users', user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
             setDbUser(docSnap.data() as DbUser);
          } else {
             // Create initial user.
             // If email is blacklistedrob@gmail.com, make admin, else member
             const isAdmin = user.email === 'blacklistedrob@gmail.com';
             const newDbUser: DbUser = {
               email: user.email || '',
               role: isAdmin ? 'admin' : 'member',
               status: 'active',
               createdAt: new Date().toISOString()
             };
             await setDoc(docRef, newDbUser);
             setDbUser(newDbUser);
          }
        } catch (e) {
          console.error("Error fetching db user", e);
        }
      } else {
        setDbUser(null);
      }
      setLoading(false);
    });
    return unsub;
  }, []);

  const login = async () => {
    try {
      setAuthError(null);
      await loginWithGoogle();
    } catch(e: any) {
       setAuthError(e.message || "Login failed");
       console.error("Login Error: ", e);
    }
  }

  const setOverrideUser = async (uid: string | null) => {
      if (!uid) {
          setSpoofUid(null);
          setSpoofDbUser(null);
      } else {
          const d = await getDoc(doc(db, 'users', uid));
          if(d.exists()) {
              setSpoofUid(uid);
              setSpoofDbUser(d.data() as DbUser);
          }
      }
  };

  const effectiveUser = spoofUid ? ({ ...user, uid: spoofUid, email: spoofDbUser?.email } as unknown as User) : user;
  const effectiveDbUser = spoofUid ? spoofDbUser : dbUser;

  return (
    <AuthContext.Provider value={{ user: effectiveUser, dbUser: effectiveDbUser, loading, login, setOverrideUser, isSpoofing: !!spoofUid, authError }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
