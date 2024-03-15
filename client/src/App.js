import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import './styles/global.scss';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Page404 from './pages/Page404';
import Users from './pages/users/Users';
import User from './pages/user/User';
import Timereport from "./pages/timereport/Timereport";
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import PrivateRoutes from './components/PrivateRoutes';
import AuthProvider from './components/AuthProvider';
<<<<<<< HEAD
import CreateAccount from './pages/CreateAccount-page';
=======
import Projects from './pages/projects/Projects';
import Project from './pages/project/Project';
>>>>>>> 803511b68b42f2c56f8ca20e2668469980fd65f9

function App() {
    const Layout = () => {
        return (
            <div className="main">
                <Navbar />
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
            <AuthProvider>
                <Routes>
                    <Route element={<PrivateRoutes element={<Layout />} />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/projects/:id" element={<Project />} />
                        <Route path="/users" element={<Users />} />
                        <Route path="/users/:id" element={<User />} />
                        <Route path="/adduser" element={<CreateAccount />} />
                        <Route path="/timereport" element={<Timereport />} />
                        <Route path="*" element={<Page404 />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;