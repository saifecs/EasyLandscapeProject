import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import { theme } from '../theme/theme';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('themePreference');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // Use system preference as default
        setIsDarkMode(systemColorScheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
      setIsDarkMode(systemColorScheme === 'dark');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('themePreference', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const setTheme = async (themeMode) => {
    try {
      setIsDarkMode(themeMode === 'dark');
      await AsyncStorage.setItem('themePreference', themeMode);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  };

  // Create theme object based on current mode
  const currentTheme = {
    ...theme,
    colors: {
      ...theme.colors,
      background: isDarkMode ? '#121212' : theme.colors.background,
      surface: isDarkMode ? '#1E1E1E' : theme.colors.surface,
      text: isDarkMode ? '#FFFFFF' : theme.colors.text,
      textSecondary: isDarkMode ? '#B0B0B0' : theme.colors.textSecondary,
      textLight: isDarkMode ? '#808080' : theme.colors.textLight,
      border: isDarkMode ? '#333333' : theme.colors.border,
      lightGray: isDarkMode ? '#2A2A2A' : theme.colors.lightGray,
    },
  };

  const value = {
    theme: currentTheme,
    isDarkMode,
    isLoading,
    toggleTheme,
    setTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}; 