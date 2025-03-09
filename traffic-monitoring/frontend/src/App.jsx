import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div class="h-full border-2 border-gray-200 
                border-opacity-60 rounded-lg 
                overflow-hidden">
        <div class="p-6 hover:bg-green-600 
                    hover:text-white transition 
                    duration-300 ease-in">
            <h1 class="text-2xl font-semibold mb-3">
                Hover
            </h1>
        </div>
    </div>
    </>
  )
}

export default App
