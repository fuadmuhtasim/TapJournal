import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Page from './app/dashboard/page-custom.tsx'
import GPTRequest from './components/testopenai.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Page/>
  </StrictMode>,
)
