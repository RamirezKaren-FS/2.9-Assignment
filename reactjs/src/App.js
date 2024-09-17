import React, {useEffect, useState} from 'react'
import './App.css';

function App() {

  const [cars, setCars] = useState(null)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState(null)

  const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000` : process.env.REACT_APP_BASE_URL;

let ignore = false;

  useEffect(() =>{
    

    if(!ignore){
      getCars();
    }

    return () => {
      ignore = true;
    }
  }, [])


  const getCars = async () =>{
    setLoading(true)
    try {
      await fetch(`${API_BASE}/cars`)
        .then(res => res.json())
        .then(data =>{
          console.log(data);
          setCars(data)
        })
    } catch (error) {
      setError(error.message || 'Unexpected Error')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <h1>Cars:</h1>
        <ul>
          <li></li>
        </ul>
      </header>
    </div>
  );
}

export default App;
