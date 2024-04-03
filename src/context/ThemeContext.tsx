import { useCallback, useEffect } from 'react';
import { createContext, useState } from 'react';

type themeType = 'light' | 'dark';

interface IThemeContext {
  isLight: boolean;
  theme: string;
  toggleTheme: () => void;
  resetTheme: () => void;
}

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<IThemeContext>({
  isLight: true,
  theme: 'light',
  toggleTheme: () => {},
  resetTheme: () => {},
});

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<themeType>('light');

  useEffect(() => {
    const rootElement = document.getElementById('root') as HTMLElement;

    if (rootElement) {
      if (theme === 'light') {
        rootElement.style.background = 'white';
        return;
      }

      rootElement.style.background = 'black';
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prevState) => (prevState === 'light' ? 'dark' : 'light'));
  }, [setTheme]);

  const resetTheme = useCallback(() => setTheme('light'), []);

  return (
    <ThemeContext.Provider value={{ isLight: theme === 'light', theme, toggleTheme, resetTheme }}>{children}</ThemeContext.Provider>
  );
};
