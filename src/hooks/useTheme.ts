import { useState, useEffect } from 'react';

/** Light mode is the site default. Dark only when the user explicitly chose it. */
function readIsDark(): boolean {
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
