import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/user/loginPage';
import RegisterPage from './pages/user/registerPage';
import { Toaster } from "react-hot-toast";
import Dashboard from './pages/dashboard/dashboard';
import Analytics from './pages/analytics/Analytics';
import Settings from './components/setting/Settings';
import Board from './components/board/board';
// import Logout from './components/logout/logout';
// import TodoCard from './components/todocard/TodoCard';
import Sharepage from './pages/share/Sharepage';
import ProtectedRoute from './components/ProtectedRoute';
function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/share/:id" element={<Sharepage/>}/>
                {/* <Route path="/card" element={<TodoCard />} /> */}


                <Route 
                    path="/dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/analytics" 
                    element={
                        <ProtectedRoute>
                            <Analytics />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/setting" 
                    element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    } 
                />
                <Route 
                    path="/board" 
                    element={
                        <ProtectedRoute>
                            <Board />
                        </ProtectedRoute>
                    } 
                />
                {/* <Route 
                    path="/logout" 
                    element={
                        <ProtectedRoute>
                            <Logout />
                        </ProtectedRoute>
                    } 
                /> */}
            </Routes>
            <Toaster />
        </BrowserRouter>
    );
}

export default App;
