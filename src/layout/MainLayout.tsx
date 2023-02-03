import { PropsWithChildren, useEffect, useState } from 'react'
import Link from 'next/link'

import { Search, ButtonLink, styled, darkMode, lightMode, Button } from '@libellum-ds/react'

import { Group } from '@/components'
import { useTheme } from '@/providers/ThemeProvider'

type MainLayoutProps = PropsWithChildren

export const MainLayout = ({ children }: MainLayoutProps) => {
  const { toggleTheme, themeName } = useTheme()

  const handleToggleTheme = () => {
    toggleTheme()
  }

  return (
    <main>
      <Button onClick={handleToggleTheme}>
          {themeName.toUpperCase()}
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
    </main>
  )
}
