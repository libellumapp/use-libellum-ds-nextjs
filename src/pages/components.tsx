import { useEffect, useRef, useState } from 'react'
import { GetServerSideProps } from 'next'
import Link from 'next/link'

import { useCookies } from 'react-cookie'

import { Group } from '@/components'
import { Button, ButtonLink, Certificate, Flag, Search, Switch, Text } from '@libellum-ds/react'
import { MainLayout } from './layout/MainLayout'


type FormSwitch = HTMLFormElement & {
  elements: {
    uncontrolledSwitch: HTMLInputElement
  }
}

type Theme = 'light' | 'dark'
type ThemeCookie = {theme: Theme}

type Teste = {
  ok: boolean
}

// export const getServerSideProps: GetServerSideProps<Teste> = async (context) => {
//   return {
//     props: {
//       ok: true
//     }
//   }
// }

export const getStaticProps: GetServerSideProps<Teste> = async (context) => {
  return {
    props: {
      ok: true
    }
  }
}

export default function Home(props: Teste) {
  const unControlledSwitchRef = useRef<HTMLButtonElement | null>(null)
  const unControlledSwitcMessagehRef = useRef<HTMLParagraphElement | null>(null)


  const [cookies, setCookie] = useCookies<'theme', ThemeCookie>()
  const [theme, setTheme] = useState<Theme>('light')
  const [swtichValue, setSwitchValue] = useState(false)
  const isDark = theme === 'dark'

  useEffect(() => {
    setTheme(cookies.theme || 'light')
  }, [cookies.theme])

  const handleToggleTheme = () => {
    setTheme(state => {
      const newTheme = state === 'light' ? 'dark' : 'light'
      setCookie('theme', newTheme)
      return newTheme
    })
  }

  const handleControlledSwitchChange = () => {
    setSwitchValue(state => {
      const newValue = !state

      // Click on uncontrolled switch when state changes
      if (unControlledSwitchRef.current) {
        unControlledSwitchRef.current.click()
      }

      return newValue
    })
  }

  const handleUnControlledSwitchClick = () => {
    const wasChecked = unControlledSwitchRef.current?.ariaChecked === 'true'
    setSwitchValue(!wasChecked)
  }

  const handleUnControlledSwitchFormSubmit = (event: React.FormEvent<FormSwitch>) => {
    event.preventDefault()

    console.log(event.currentTarget.elements?.uncontrolledSwitch.value)
    console.log(unControlledSwitchRef.current?.value)

    const isUncontrolledSwitchChecked = event.currentTarget.elements?.uncontrolledSwitch.checked
    if (unControlledSwitcMessagehRef.current) unControlledSwitcMessagehRef.current.innerText = `The state is ${isUncontrolledSwitchChecked ? 'on' : 'off'}`
  }


  return (
    <MainLayout>

      <Text type="display" as="div">
        <Certificate/>
        Use Libellum DS - Components
        <Certificate />
      </Text>

      <Group>
        <Text type="title">Button</Text>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <Button>Primary</Button>
          <Button disabled>Primary Disabled</Button>
          <Button><Search />Primary</Button>
          <Button>Primary<Search /></Button>
          <Button><Search />Primary<Search /></Button>
          <Button disabled><Search />Primary<Search /></Button>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
          <Button variant="outline">Outlined</Button>
          <Button variant="outline" disabled>Outlined Disabled</Button>
          <Button variant="outline"><Search />Outlined</Button>
          <Button variant="outline">Outlined<Search /></Button>
          <Button variant="outline"><Search />Outlined<Search /></Button>
          <Button variant="outline" disabled><Search />Outlined<Search /></Button>
        </div>
      </Group>

      <Group>
        <Text type="title">Button Links</Text>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
            <ButtonLink as={Link} href="/" disabled>
                <Search />
                Home (Router Link)
                <Search />
            </ButtonLink>
        </div>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
          <ButtonLink href="#">Home (HTML anchor)</ButtonLink>
          <ButtonLink href="#">Components Home (HTML anchor)</ButtonLink>
          <ButtonLink href="#" disabled>Components Home (HTML anchor)</ButtonLink>
        </div>
      </Group>

      <Group>
        <Text type="title">Controlled Switch</Text>
        <Switch checked={swtichValue} onCheckedChange={handleControlledSwitchChange}/>
        <Text type="caption">{`The state is ${swtichValue ? 'on' : 'off'}`}</Text>
      </Group>

      <Group>
        <Text type="title">UnControlled Switch</Text>
        <form onSubmit={handleUnControlledSwitchFormSubmit}>
          <Switch 
            name="uncontrolledSwitch" 
            ref={unControlledSwitchRef} 
            defaultChecked={swtichValue} 
            onClick={handleUnControlledSwitchClick} 
          />
          <Text type="caption" ref={unControlledSwitcMessagehRef}>{`The state is`}</Text>
          
          <Button>
            <Flag />
            Enviar
          </Button>
        </form>
      </Group>
    </MainLayout>
  )
}
