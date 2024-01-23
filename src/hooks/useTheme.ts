import {useState, useEffect, useCallback} from 'react';

export const useTheme = () => {
  const localTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState(localTheme ?? 'light');

  const toggleTheme = useCallback((mode?: string) => {
    const altTheme = theme === 'light' ? 'dark' : 'light';
    const newTheme = mode ?? altTheme;
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
    document.body.className = newTheme;
  }, [theme]);

  // Prevents flashing of light theme on page load.
  useEffect(() => {
    const timeout = setTimeout(() => {
      document.body.style.transition = 'all 0.3s ease';
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Function to update theme based on system preference
    const updateTheme = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'dark' : 'light';
      toggleTheme(newTheme);
    };

    // Get user's preference from localStorage or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const defaultTheme = savedTheme || (prefersDarkMode ? 'dark' : 'light');
    setTheme(defaultTheme);
    document.body.className = defaultTheme;

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', updateTheme);

    return () => media.removeEventListener('change', updateTheme);
  }, [toggleTheme]);

  return { theme, toggleTheme };
};
