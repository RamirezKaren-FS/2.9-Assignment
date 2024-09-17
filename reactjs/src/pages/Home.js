import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css';

function Home() {

return (
    <div className="App">
        <header className="App-header">
        <h1>Your Favorite Cars:</h1>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/cars">Cars</Link>
    </header>
    </div>
    );
}

export default Home;
