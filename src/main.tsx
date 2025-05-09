import { StrictMode } from 'react'

import { startReactDsfr } from '@codegouvfr/react-dsfr/spa'
import { createRoot } from 'react-dom/client'
import { Link } from 'react-router-dom'

import { App } from './App'
import reportWebVitals from './reportWebVitals'

declare module '@codegouvfr/react-dsfr/spa' {
  interface RegisterLink {
    Link: typeof Link
  }
}

startReactDsfr({
  defaultColorScheme: 'system',
  Link,
})

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
