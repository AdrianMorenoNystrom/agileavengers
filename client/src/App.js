import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import './styles/global.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Page404 from './pages/Page404';
import Projects from './pages/projects/Projects';
import Project from './pages/project/Project';
import Users from './pages/users/Users';
import User from './pages/user/User';
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(() => localStorage.getItem(process.env.AUTH_KEY) === 'true');

    useEffect(() => {
        localStorage.setItem(process.env.AUTH_KEY, isAuthenticated);
    }, [isAuthenticated]);

    const PrivateRoute = ({ element, ...props }) => {
        return isAuthenticated ? element : <Navigate to="/login" />;
    };

    const Layout = () => {
        return (
            <div className="main">
                <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />
                <div className="container">
                    <div className="menuContainer">
                        <Menu />
                    </div>
                    <div className="contentContainer">
                        <Outlet />
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Router>

            <Routes>
                <Route element={<PrivateRoute element={<Layout />} />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/projects/:id" element={<Project />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/users/:id" element={<User />} />
                    <Route path="*" element={<Page404 />} />
                </Route>
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            </Routes>
        </Router>
    );
}

export default App;
