import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing token on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      const storedUser = await AsyncStorage.getItem('userData');
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with actual API endpoint
      const response = await mockLoginAPI(email, password);
      
      if (response.success) {
        const { user: userData, token: authToken } = response;
        
        // Store token and user data
        await AsyncStorage.setItem('userToken', authToken);
        await AsyncStorage.setItem('userData', JSON.stringify(userData));
        
        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with actual API endpoint
      const response = await mockRegisterAPI(userData);
      
      if (response.success) {
        const { user: newUser, token: authToken } = response;
        
        // Store token and user data
        await AsyncStorage.setItem('userToken', authToken);
        await AsyncStorage.setItem('userData', JSON.stringify(newUser));
        
        setToken(authToken);
        setUser(newUser);
        setIsAuthenticated(true);
        
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Registration failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      // Clear stored data
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userData');
      
      // Reset state
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const updateUserProfile = async (updatedData) => {
    try {
      const updatedUser = { ...user, ...updatedData };
      
      // Simulate API call - replace with actual API endpoint
      const response = await mockUpdateProfileAPI(updatedUser);
      
      if (response.success) {
        // Update stored user data
        await AsyncStorage.setItem('userData', JSON.stringify(updatedUser));
        setUser(updatedUser);
        return { success: true };
      } else {
        return { success: false, error: response.error };
      }
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'Profile update failed. Please try again.' };
    }
  };

  const forgotPassword = async (email) => {
    try {
      setIsLoading(true);
      
      // Simulate API call - replace with actual API endpoint
      const response = await mockForgotPasswordAPI(email);
      
      return response;
    } catch (error) {
      console.error('Forgot password error:', error);
      return { success: false, error: 'Password reset failed. Please try again.' };
    } finally {
      setIsLoading(false);
    }
  };

  // Mock API functions - replace with actual API calls
  const mockLoginAPI = async (email, password) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock validation
    if (email === 'demo@example.com' && password === 'password') {
      return {
        success: true,
        user: {
          id: '1',
          email: 'demo@example.com',
          name: 'John Doe',
          phone: '+1234567890',
          address: '123 Main St, City, State',
          avatar: null,
          preferences: {
            notifications: true,
            emailUpdates: true,
          },
        },
        token: 'mock-jwt-token-12345',
      };
    } else {
      return {
        success: false,
        error: 'Invalid email or password',
      };
    }
  };

  const mockRegisterAPI = async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      user: {
        id: '2',
        email: userData.email,
        name: userData.name,
        phone: userData.phone,
        address: userData.address,
        avatar: null,
        preferences: {
          notifications: true,
          emailUpdates: true,
        },
      },
      token: 'mock-jwt-token-new-user',
    };
  };

  const mockUpdateProfileAPI = async (userData) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      success: true,
      user: userData,
    };
  };

  const mockForgotPasswordAPI = async (email) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      success: true,
      message: 'Password reset email sent successfully',
    };
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    token,
    login,
    register,
    logout,
    updateUserProfile,
    forgotPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 