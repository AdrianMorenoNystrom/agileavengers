import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import GetPeople from './components/GetPeople';
import SignIn from './pages/SignIn';
import Page404 from './pages/Page404';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <Router>
            {isAuthenticated && <Header isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}
            <Routes>
                <Route path='/login' element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
                {isAuthenticated ? (
                    <>
                        <Route path='/' element={<Home />} />
                        <Route path='/people' element={<GetPeople />} />
                    </>
                ) : (
                    <Route path="/" element={<Navigate to="/login" />} />
                )}
                <Route path='*' element={<Page404 isAuthenticated={isAuthenticated} />} />
            </Routes>
            {isAuthenticated && <Footer />}
        </Router>
    );
}

export default App;
