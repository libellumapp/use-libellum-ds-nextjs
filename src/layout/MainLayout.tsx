import { PropsWithChildren, useEffect, useState } from 'react'
import Link from 'next/link'

import { useCookies } from 'react-cookie'
import { Search, ButtonLink, styled, darkMode, lightMode, Button } from '@libellum-ds/react'

import { Group, Main } from '@/components'

type MainLayoutProps = PropsWithChildren
type Theme = 'light' | 'dark'
type ThemeCookie = {theme: Theme}

export const MainLayout = ({ children }: MainLayoutProps) => {

  const [cookies, setCookie] = useCookies<'theme', ThemeCookie>()
  const [theme, setTheme] = useState<Theme>('light')
  const isDark = theme === 'dark'

  const handleToggleTheme = () => {
    setTheme(state => {
      const newTheme = state === 'light' ? 'dark' : 'light'
      setCookie('theme', newTheme)
      return newTheme
    })
  }

  useEffect(() => {
    setTheme(cookies.theme || 'light')
  }, [cookies.theme])

  return (
    <main>
      <Main className={isDark ? darkMode: lightMode}>
        <Button onClick={handleToggleTheme}>
            {theme.toUpperCase()}
        </Button>

        <Group>
            <ButtonLink as={Link} href="/">
                <Search />
                Home (Router Link)
                <Search />
            </ButtonLink>

            <ButtonLink as={Link} href="/components">
                <Search />
                Components (Router Link)
                <Search />
            </ButtonLink>
        </Group>

        {children}
      </Main>
    </main>
  )
}
