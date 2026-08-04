import { useState, useEffect } from 'react';

function readIsDark(): boolean {
  if (typeof document !== 'undefined' && document.documentElement.classList.contains('dark')) {
    return true;
  }
  try {
    return localStorage.getItem('theme') === 'dark';
  } catch {
    return false;
  }
}

export function useTheme() {
  const [isDark, setIsDark] = useState(readIsDark);

  useEffect(() => {
    const shouldBeDark = readIsDark();
    setIsDark(shouldBeDark);
    updateTheme(shouldBeDark);
  }, []);

  const updateTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    updateTheme(newTheme);
  };

  return { isDark, toggleTheme };
}
