import type { AppProps } from 'next/app'
import { Manrope } from '@next/font/google'

import globalStyles from '@/styles/global'

const manrope = Manrope({
  weight: ['500', '600', '700'],
  style: ['normal'],
  subsets: ['latin'],
})

export default function App({ Component, pageProps }: AppProps) {
  globalStyles()
  return  <>
    
      <main className={manrope.className}>
        <Component {...pageProps} />
      </main>  
  </>
}
