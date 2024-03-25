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
import TimereportHistory from "./pages/timereport/History";
import Navbar from './components/navbar/Navbar';
import Menu from './components/menu/Menu';
import PrivateRoutes from './components/PrivateRoutes';
import AuthProvider from './components/AuthProvider';
import Projects from './pages/projects/Projects';
import Project from './pages/project/Project';

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
                        <Route path="/timereport" element={<Timereport />} />
                        <Route
                          path="/timereport/edit/:id"
                          element={<Timereport isUpdate={true} />}
                        />
                        <Route
                          path="/timereports/history"
                          element={<TimereportHistory isUpdate={false} />}
                        />
                        <Route path="*" element={<Page404 />} />
                    </Route>
                    <Route path="/login" element={<Login />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default App;
