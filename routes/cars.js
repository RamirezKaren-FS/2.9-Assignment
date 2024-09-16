const express = require('express')
const router = express.Router();

const Car = require('../models/cars')

const getCar = async (req, res, next) =>{
    let car
    try {
        car = await Car.findById(req.params.id)
        if(car === null){
            return res.status(404).json({message:"Car not found"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.car = car;
    next();
}

router.get('/', async (req,res) => {
    try {
        const cars = await Car.find()
        res.json(cars)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/:id', getCar, async (req,res) => {
    res.json(res.car)
})

router.post('/', async (req,res) => {
    const car = new Car({
        make: req.body.make,
        model: req.body.model,
        year: req.body.year
    })
    try {
        const newCar = await car.save();
        res.status(201).json(newCar)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.patch('/:id', getCar, async (req,res) => {
    if(req.body.make != null ){
        res.car.make = req.body.make
    }
    if(req.body.model != null ){
        res.car.model = req.body.model
    }
    if(req.body.year != null ){
        res.car.year = req.body.year
    }
    try {
        const updatedCar = await res.car.save()
        res.json(updatedCar)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

router.delete('/:id', getCar, async (req,res) => {
    try {
        await res.car.deleteOne()
        res.json({message: "Removed car"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router