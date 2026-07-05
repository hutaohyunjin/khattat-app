import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1 style={{ color: '#E85020' }}>+ KHATTAT</h1>
      <p>Arabic calligraphy app — loading...</p>
    </div>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode><App /></StrictMode>
)
