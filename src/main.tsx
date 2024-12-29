import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ActiveFunctionalityProvider } from './context/ActiveFunctionalityContext.tsx'

import App from './App.tsx'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ActiveFunctionalityProvider>
      <App />
    </ActiveFunctionalityProvider>
  </StrictMode>,
)