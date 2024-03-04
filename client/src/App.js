import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

function App() {
    return (
        <Router>
            <div className='App'>
                <header><Header /></header>
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='*' element={<div>Error: Page not found</div>} />
                    </Routes>
                </main>
                <footer><Footer /></footer>
            </div>
        </Router>
    );
}

export default App;
