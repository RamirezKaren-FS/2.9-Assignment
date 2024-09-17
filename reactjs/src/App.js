import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Home from "./pages/Home"
import Dashboard from './pages/Dashboard';
import Car from "./pages/Car"

function App() {

  
  return (
    <Router>
      <Routes>
      <Route path="/dashboard" exact element={<Dashboard />}/>
      <Route path="/cars" exact element={<Car />}/>
      <Route path="/" exact element={<Home />}/>
      </Routes>
    </Router>
  )
}

export default App;
