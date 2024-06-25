// import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import {Toaster , toast } from "react-hot-toast"
import Dashboard from './pages/dashboard';
import Analytics from './pages/Analytics';
import Settings from './components/setting/Settings';



function App() {
  return (
    <BrowserRouter>
   
        <Routes >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/setting" element={<Settings/>}/>
                            
        </Routes> 
        <Toaster />
    </BrowserRouter>
  );
}

export default App;
