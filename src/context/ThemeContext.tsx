/**
 * Build While Bleeding — Theme Provider
 * buildwhilebleeding.com
 * High-contrast theme state manager: Asphalt (Dark) & Bone (Light)
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
  isDark: true,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<Theme>(() => {
    try {
      const saved = localStorage.getItem('leak-report-theme');
      if (saved === 'dark' || saved === 'light') return saved;
    } catch (e) {
      console.error('[BWB] LocalStorage read failed:', e);
    }
    // Default to the flagship Asphalt Monolith dark mode
    return 'dark';
  });

  const isDark = theme === 'dark';

  useEffect(() => {
    try {
      localStorage.setItem('leak-report-theme', theme);
    } catch (e) {
      console.error('[BWB] LocalStorage save failed:', e);
    }

    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
