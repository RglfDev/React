import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { EventProvider } from './context/EventContext.tsx'
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ParticipantProvider } from './context/ParticipantContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <EventProvider>
        <ParticipantProvider>
        <App />
        </ParticipantProvider>
      </EventProvider>
    </BrowserRouter>
  </StrictMode>,
)
