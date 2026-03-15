import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom'
import 'flowbite'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId='123931023322-mj9itsrp78thtfcggbv164ddcbo2a9an.apps.googleusercontent.com'>
  <StrictMode>
    <HashRouter>
    <App />
    </HashRouter>
  </StrictMode>
  </GoogleOAuthProvider>,
)
