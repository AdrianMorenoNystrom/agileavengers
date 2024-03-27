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
import PrivateRoutes from './components/PrivateRoutes';
import AuthProvider from './components/AuthProvider';
import CreateAccount from './pages/CreateAccount-page';
import Projects from './pages/projects/Projects';
import Project from './pages/project/Project';
import NewProject from './pages/new project/NewProject';
import '@fontsource-variable/inter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './styles/theme';
import SideBar from './components/sidebar/SideBar';
import './components/sidebar/SideBar';

function App() {

    const Layout = () => {
        return (
            <ThemeProvider theme={theme}>
                <div className="main">
                    <Navbar />
                    <div className="container">
                        <SideBar/>
                      <div className="contentContainer">
                          <Outlet />
                      </div>
                    </div>
                </div>
            </ThemeProvider>
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
              <Route path="/new/timereport" element={<Timereport />} />
              <Route path='/new/project' element={<NewProject />} />           
              <Route
                path="/timereport/edit/:id"
                element={<Timereport isUpdate={true} />}
              />
              <Route
                path="/timereports/history"
                element={<TimereportHistory />}
              />
              <Route
                path="/timereports/all-history"
                element={<TimereportHistory isAllHistory={true} />}
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