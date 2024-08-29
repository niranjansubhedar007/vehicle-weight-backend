const express = require('express');
const Vehical = require('../models/Vehical');
const router = express.Router()


// router.post('/vehicles', async (req, res) => {
//     try {
//         const newVehicle = await Vehical.create(req.body);
//         res.json(newVehicle);
//     } catch (error) {
//         console.error('Error creating vehicle:', error);
//         res.status(500).json({ error: 'Error creating vehicle' });
//     }
// });

router.post('/vehicles', async (req, res) => {
    try {
        const newVehicle = await Vehical.create(req.body);
        res.json(newVehicle);
    } catch (error) {
        console.error('Error creating vehicle:', error);
        res.status(500).json({ error: 'Error creating vehicle' });
    }
});



// Read a vehicle by its attributes
router.get('/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await Vehical.findById(req.params.id);
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (error) {
        console.error('Error finding vehicle:', error);
        res.status(500).json({ error: 'Error finding vehicle' });
    }
});
router.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await Vehical.find();
        res.json(vehicles);
    } catch (error) {
        console.error('Error finding vehicles:', error);
        res.status(500).json({ error: 'Error finding vehicles' });
    }
});

// Get vehicle details by RTONo
router.get('/vehicles/details/:rtOno', async (req, res) => {
    try {
        const { rtOno } = req.params;
        const vehicle = await Vehical.findOne({ vehicalRTONo: rtOno });
        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json(vehicle);
    } catch (error) {
        console.error('Error finding vehicle details:', error);
        res.status(500).json({ error: 'Error finding vehicle details' });
    }
});

router.patch('/vehicles/:id', async (req, res) => {
    try {
        const updatedVehicle = await Vehical.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedVehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json(updatedVehicle);
    } catch (error) {
        console.error('Error updating vehicle:', error);
        res.status(500).json({ error: 'Error updating vehicle' });
    }
});



// Delete a vehicle
router.delete('/vehicles/:id', async (req, res) => {
    try {
        const deletedVehicle = await Vehical.findByIdAndDelete(req.params.id);
        if (!deletedVehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }
        res.json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        console.error('Error deleting vehicle:', error);
        res.status(500).json({ error: 'Error deleting vehicle' });
    }
});



module.exports = router