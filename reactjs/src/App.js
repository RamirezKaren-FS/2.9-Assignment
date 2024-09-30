import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'

import authService from './services/auth.service';

import Home from "./pages/Home"
import Dashboard from './pages/Dashboard';
import Car from "./pages/Car"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"


import { useEffect, useState } from 'react';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() =>{
    const user = authService.getCurrentUser();
    if(user){
      setCurrentUser(user)
    }
  }, [])

  const logout = () =>{
    authService.logout();
  }
  
  return (
    <div>
      <div> {
        currentUser
        ?<h2>Logged In</h2>
        :<h2>Logged Out</h2>
      }
      </div>
      <section>
      <Routes>
      <Route path="/login" exact element={<Login />}/>
      <Route path="/signup" exact element={<SignUp />}/>
      <Route path="/dashboard" exact element={<Dashboard />}/>
      <Route path="/cars/:id" exact element={<Car/>}/>
      <Route path="/" exact element={<Home />}/>
      </Routes>
    </section>
    </div>
  )
}

export default App;
