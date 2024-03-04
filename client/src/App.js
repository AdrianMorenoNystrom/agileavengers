import React from 'react';
import './App.css';
import GetProjects from './components/GetProjects';
import GetPeople from './components/GetPeople';
import AddProject from './components/AddProject';

function App() {
    return (
        <div className="App">
            <GetProjects />
            <GetPeople />
            <AddProject/>
        </div>
    );
}

export default App;
