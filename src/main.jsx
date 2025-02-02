import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Landing from './page/Landing.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";

createRoot(document.getElementById('root'))
.render(
    <BrowserRouter>
        <Routes >
            <Route path='/' element={ <Landing /> } />
            <Route path='/quiz' element={ <App /> } />
        </Routes>
    </BrowserRouter>
)
