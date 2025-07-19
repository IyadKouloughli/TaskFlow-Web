import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
  changePassword: (currentPassword: string, newPassword: string, verificationCode: string) => Promise<{ success: boolean; message: string }>;
  sendPasswordChangeCode: () => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email && u.password === password);
    
    if (user) {
      const userData = { id: user.id, email: user.email, name: user.name };
      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUser = users.find((u: any) => u.email === email);
    
    if (existingUser) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    const userData = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userData);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const forgotPassword = async (email: string): Promise<{ success: boolean; message: string }> => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === email);
    
    if (!user) {
      return { success: false, message: 'No account found with this email address.' };
    }

    // For demo purposes, we'll show the password in the success message
    return { 
      success: true, 
      message: `Password reset sent to ${email}. Your current password is: ${user.password}` 
    };
  };

  const sendPasswordChangeCode = async (): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'User not authenticated.' };
    }
    
    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store the code temporarily (in real app, this would be server-side)
    localStorage.setItem(`verification_code_${user.id}`, verificationCode);
    
    // In a real app, you would send this code via email
    return { 
      success: true, 
      message: `Verification code sent to ${user.email}. Your code is: ${verificationCode}` 
    };
  };

  const changePassword = async (currentPassword: string, newPassword: string, verificationCode: string): Promise<{ success: boolean; message: string }> => {
    if (!user) {
      return { success: false, message: 'User not authenticated.' };
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: any) => u.id === user.id);
    
    if (userIndex === -1) {
      return { success: false, message: 'User not found.' };
    }
    
    // Verify current password
    if (users[userIndex].password !== currentPassword) {
      return { success: false, message: 'Current password is incorrect.' };
    }
    
    // Verify the verification code
    const storedCode = localStorage.getItem(`verification_code_${user.id}`);
    if (!storedCode || storedCode !== verificationCode) {
      return { success: false, message: 'Invalid verification code.' };
    }
    
    // Update password
    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));
    
    // Clean up verification code
    localStorage.removeItem(`verification_code_${user.id}`);
    
    return { success: true, message: 'Password changed successfully!' };
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      forgotPassword, 
      changePassword, 
      sendPasswordChangeCode, 
      logout, 
      isLoading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};