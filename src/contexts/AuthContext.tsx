import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { User, UserRole, Badge } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  currentBadge: Badge | null;
  nextBadge: Badge | null;
  progressToNextBadge: number;
  addPoints: (amount: number) => void;
}

export const badges: Badge[] = [
  { id: '1', name: 'Newbie', level: 1, requiredPoints: 20, icon: '🌱', color: 'badge-newbie' },
  { id: '2', name: 'Explorer', level: 2, requiredPoints: 40, icon: '🔍', color: 'badge-explorer' },
  { id: '3', name: 'Achiever', level: 3, requiredPoints: 60, icon: '⭐', color: 'badge-achiever' },
  { id: '4', name: 'Specialist', level: 4, requiredPoints: 80, icon: '🎯', color: 'badge-specialist' },
  { id: '5', name: 'Expert', level: 5, requiredPoints: 100, icon: '💎', color: 'badge-expert' },
  { id: '6', name: 'Master', level: 6, requiredPoints: 120, icon: '👑', color: 'badge-master' },
];

const getCurrentBadge = (points: number): Badge => {
  return [...badges].reverse().find(b => points >= b.requiredPoints) || badges[0];
};

const getNextBadge = (points: number): Badge | null => {
  return badges.find(b => b.requiredPoints > points) || null;
};

const getProgressToNextBadge = (points: number): number => {
  const current = getCurrentBadge(points);
  const next = getNextBadge(points);

  if (!next) return 100;

  const range = next.requiredPoints - current.requiredPoints;
  const progress = points - current.requiredPoints;

  if (range <= 0) return 100;

  return Math.min(100, Math.max(0, Math.round((progress / range) * 100)));
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load user from token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Failed to fetch user');
        })
        .then(userData => {
          setUser(userData);
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = useCallback(async (email: string, password: string, _role?: UserRole) => {
    try {
      const formData = new URLSearchParams(); // OAuth2PasswordRequestForm expects form data usually, or JSON?
      // Check backend auth.py: LoginSchema is Pydantic model => JSON body.
      // Wait, backend auth.py uses `login_data: LoginSchema` (JSON body) at /login
      // BUT `oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")` usually expects form data.
      // Let's check backend auth.py router:
      // @router.post("/login", response_model=user_schema.Token)
      // def login(login_data: LoginSchema, ...)
      // It expects JSON because `LoginSchema` is a Pydantic model, not `OAuth2PasswordRequestForm`.

      const res = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.detail || 'Login failed');
      }

      const data = await res.json();
      localStorage.setItem('token', data.access_token);

      // Fetch user details immediately
      const userRes = await fetch('/api/v1/auth/me', {
        headers: { 'Authorization': `Bearer ${data.access_token}` }
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const addPoints = useCallback((amount: number) => {
    setUser(prev => {
      if (!prev) return null;
      return { ...prev, totalPoints: prev.totalPoints + amount };
    });
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  }, [user]);

  const currentBadge = user ? getCurrentBadge(user.totalPoints) : null;
  const nextBadge = user ? getNextBadge(user.totalPoints) : null;
  const progressToNextBadge = user ? getProgressToNextBadge(user.totalPoints) : 0;

  const value = useMemo(() => ({
    user,
    isAuthenticated: !!user,
    login,
    logout,
    switchRole,
    currentBadge,
    nextBadge,
    progressToNextBadge,
    addPoints
  }), [user, login, logout, switchRole, currentBadge, nextBadge, progressToNextBadge, addPoints]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
