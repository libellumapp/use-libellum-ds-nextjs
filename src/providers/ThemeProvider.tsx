import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { darkMode, lightMode } from '@libellum-ds/react'
import { useCookies } from 'react-cookie'

type ThemeName = 'light' | 'dark'
type Theme = typeof darkMode
type ThemeCookie = {theme: ThemeName}
type ThemeContextType = {
    theme: Theme,
    themeName: string,
    toggleTheme: () => void
}
type ThemeProviderProps = PropsWithChildren

const ThemeContext = createContext<ThemeContextType | null>(null)

const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [themeName, setThemeName] = useState<ThemeName>('light')
    const [cookies, setCookie] = useCookies<'theme', ThemeCookie>()

    const toggleTheme = useCallback(() => {
        setThemeName(state => {
            const newTheme = state === 'light' ? 'dark' : 'light'
            setCookie('theme', newTheme)
            return newTheme
        })
    }, [setCookie])

    const theme = useMemo(() => {
        return themeName === 'light' ? lightMode : darkMode
    }, [themeName])

    const providerValues = {
        theme,
        themeName,
        toggleTheme,
    }

    useEffect(() => {
        const themeName = cookies.theme || 'light'

        const body = document.querySelector('body')
        if (body) {           
            if (themeName === 'light') {
                body.classList.remove(darkMode)
                body.classList.add(lightMode)
            } else {
                body.classList.add(darkMode)
                body.classList.remove(lightMode)
            }
            body.style.backgroundColor = theme.colors['color-background'].value
        }
        setThemeName(themeName)
    }, [cookies.theme, theme])
    
    return (
        <ThemeContext.Provider value={providerValues}>
            {children}
        </ThemeContext.Provider>
    )
}

const useTheme = () => {
    const context = useContext(ThemeContext)

    if (!context) {
        throw new Error('useTheme must be use inside ThemeProvider')
    }
    
    return context
}

export { ThemeProvider, useTheme }