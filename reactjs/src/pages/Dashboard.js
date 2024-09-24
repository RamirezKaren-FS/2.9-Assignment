import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom';
import '../App.css';

function Dashboard() {

    const [cars, setCars] = useState([])

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)

    const [values, setValues] = useState({
        make: "",
        model: "",
        year:""
    })

    const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : process.env.REACT_APP_BASE_URL;

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

const createCar = async () =>{
    try {
        await fetch(`${API_BASE}/cars`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application-json'
            },
            body: JSON.stringify(values)
        })
        .then(() => getCars())
        
    }
    catch (error) {
        setError(error.message || 'Unexpected Error')
    } finally {
        setLoading(false)
    }
}
const handleSubmit = (event) => {
    event.preventDefault();
    createCar();
}

const handleInputChanges = (event) => {
    event.persist();
    setValues((values) => ({
    ...values,
    [event.target.name] : event.target.value
    }))
}

return (
    <div className="App">
        <header className="App-header">
        <h1>Cars:</h1>
        <Link to="/">Homepage</Link> 
        <ul>
            <li>{[cars.year]}</li>
            {/* {
                cars.map(car =>{
                    <li key={car._id}>
                        <Link to={`/cars/${car._id}`}>{car.make}</Link>
                    </li>
                })
            } */}
        </ul>
        <form onSubmit={(event) => handleSubmit(event)}>
            <label>Make:
            <input type='text' name="make" value={values.make} onChange={handleInputChanges}/>
            </label>
            <label>Model:
            <input type='text' name="model" value={values.model} onChange={handleInputChanges}/>
            </label>
            <label>Year:
            <input type='text' name="year" value={values.year} onChange={handleInputChanges}/>
            </label>
            <input type='submit' value='submit'/>
        </form>

    </header>
    </div>
    );
}

export default Dashboard;
