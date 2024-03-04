import React from 'react';
import './App.css';
import GetProjects from './components/GetProjects';
import AddProject from './components/AddProject';
import AddPeople from './components/AddPeople';
function App() {
    return (
        <div className="App">
            <GetProjects />
            <AddPeople />
            <AddProject />
        </div>
    );
}

export default App;
