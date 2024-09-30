import React, {useEffect, useState} from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import authHeader from '../services/auth.header';
import '../App.css';

function Car() {

    const [cars, setCars] = useState(null)

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)
    

    const [values, setValues] = useState({
        make: "",
        model: "",
        year: ""
    })

    const { id }= useParams();

    const navigate = useNavigate();

    const API_BASE = process.env.NODE_ENV === 'development' ? `http://localhost:8000/api/v1` : process.env.REACT_APP_BASE_URL;

let ignore = false;

    useEffect(() =>{
    if(!ignore){
        getCar();
    }

    return () => {
        ignore = true;
    }
    }, [])


    const getCar = async () =>{
    setLoading(true)
    try {
        await fetch(`${API_BASE}/cars/${id}`, {headers: authHeader()})
        .then(res => res.json())
        .then(data =>{
            setValues({
                make: data.make,
                model: data.model,
                year: data.year
            })
        })
    } catch (error) {
        setError(error.message || 'Unexpected Error')
    } finally {
        setLoading(false)
    }
}

    const deleteCar = async () =>{
        try {
            await fetch(`${API_BASE}/cars/${id}`, {
                method: 'DELETE',
                headers: authHeader()
            })
            .then(res => res.json())
            .then(data =>{
            setCars(data)
            navigate("/dashboard", {replace: true})
        })
        }
        catch (error) {
            setError(error.message || 'Unexpected Error')
        } finally {
            setLoading(false)
        }
    }

    const updateCar = async () => {
        try {
            await fetch(`${API_BASE}/cars/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application-json'
                },
                body: JSON.stringify(values),
                headers: authHeader()
            })
            .then(res => res.json())
            .then(data =>{
                console.log({data});
        })
        }
        catch (error) {
            setError(error.message || 'Unexpected Error')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updateCar();
    }

    const handleInputChanges = (event) => {
        event.persist();
        setValues(({values}) => ({
        ...values,
        [event.target.name]: event.target.value
        }))
    }

return (
    <div className="App">
        <header className="App-header">
        <h1>Car List:</h1>
        <h5>ID:{values&&values._id}</h5>
        <h5>Make:{values&&values.make}</h5>
        <h5>Model:{values&&values.model}</h5>
        <h5>Year:{values&&values.year}</h5>


        <Link to="/dashboard">Dashboard</Link>
        <Link to="/">Home</Link>

        <button onClick={() => deleteCar()}>Delete Car </button>
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

export default Car;
