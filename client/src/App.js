import React from 'react';
import './App.css';
import GetProjects from './components/GetProjects';
import GetPeople from './components/GetPeople';

function App() {
    return (
        <div className="App">
            <GetProjects />
            <GetPeople />
        </div>
    );
}

export default App;
