import type { AppProps } from 'next/app'
// import { Manrope } from '@next/font/google'

import globalStyles from '@/styles/global'
import { ThemeProvider } from '@/providers/ThemeProvider'

// const manrope = Manrope({
//   weight: ['500', '600', '700'],
//   style: ['normal'],
//   subsets: ['latin'],
// })

export default function App({ Component, pageProps }: AppProps) {
  globalStyles()
  return  <>
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
}
