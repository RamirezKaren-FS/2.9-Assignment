import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import authService from '../services/auth.service';
import '../App.css';

function Login() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();

    const handleLogin = async (e)=>{
        e.preventDefault();
        try {
            await authService.login(email,password).then(
                response =>{
                    navigate("/dashboard")
                },
                error => {
                    console.error(error)
                }
            )
        } catch (error) {
            console.error(error)
        }
    }

return (
    <div className="App">
        <header className="App-header">
        <h1>Login Screen </h1>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/cars">Cars</Link>
        <section>
        <form onSubmit={handleLogin}>
            <input
                type='text'
                placeholder='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type='text'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type='submit'>Sign Up</button>
        </form>
    </section>
    </header>
    </div>
    );
}

export default Login;
