import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'

import { ActiveFunctionalityProvider } from './context/ActiveFunctionalityContext.tsx'

import App from './App.tsx'

import store from './store.ts'

import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ActiveFunctionalityProvider>
        <App />
      </ActiveFunctionalityProvider>
    </Provider>
  </StrictMode>,
)