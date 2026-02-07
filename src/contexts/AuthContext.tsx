import React, { createContext, useContext, useState, useCallback } from 'react';
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
}

const badges: Badge[] = [
  { id: '1', name: 'Newbie', level: 1, requiredPoints: 20, icon: '🌱', color: 'badge-newbie' },
  { id: '2', name: 'Explorer', level: 2, requiredPoints: 40, icon: '🔍', color: 'badge-explorer' },
  { id: '3', name: 'Achiever', level: 3, requiredPoints: 60, icon: '⭐', color: 'badge-achiever' },
  { id: '4', name: 'Specialist', level: 4, requiredPoints: 80, icon: '🎯', color: 'badge-specialist' },
  { id: '5', name: 'Expert', level: 5, requiredPoints: 100, icon: '💎', color: 'badge-expert' },
  { id: '6', name: 'Master', level: 6, requiredPoints: 120, icon: '👑', color: 'badge-master' },
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const getCurrentBadge = useCallback((points: number): Badge => {
    return [...badges].reverse().find(b => points >= b.requiredPoints) || badges[0];
  }, []);

  const getNextBadge = useCallback((points: number): Badge | null => {
    return badges.find(b => b.requiredPoints > points) || null;
  }, []);

  const getProgressToNextBadge = useCallback((points: number): number => {
    const current = getCurrentBadge(points);
    const next = getNextBadge(points);
    if (!next) return 100;
    const range = next.requiredPoints - current.requiredPoints;
    const progress = points - current.requiredPoints;
    return Math.round((progress / range) * 100);
  }, [getCurrentBadge, getNextBadge]);

  const login = useCallback(async (email: string, _password: string, role: UserRole = 'learner') => {
    // Mock login - in production, this would call an API
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      role,
      totalPoints: 45,
      createdAt: new Date().toISOString(),
    };
    setUser(mockUser);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const switchRole = useCallback((role: UserRole) => {
    if (user) {
      setUser({ ...user, role });
    }
  }, [user]);

  const currentBadge = user ? getCurrentBadge(user.totalPoints) : null;
  const nextBadge = user ? getNextBadge(user.totalPoints) : null;
  const progressToNextBadge = user ? getProgressToNextBadge(user.totalPoints) : 0;

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      switchRole,
      currentBadge,
      nextBadge,
      progressToNextBadge,
    }}>
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

export { badges };
