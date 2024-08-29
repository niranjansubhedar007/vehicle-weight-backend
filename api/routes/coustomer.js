const express = require('express');
const Coustomer = require('../models/Coustomer');

const router = express.Router()


router.post('/coustomers', async (req, res) => {
    try {
        const newcoustomer = await Coustomer.create(req.body);
        res.json(newcoustomer);
    } catch (error) {
        console.error('Error creating coustomer:', error);
        res.status(500).json({ error: 'Error creating coustomer' });
    }
});

// Read a coustomer by its attributes
router.get('/coustomers/:id', async (req, res) => {
    try {
        const coustomer = await Coustomer.findById(req.params.id);
        if (!coustomer) {
            return res.status(404).json({ error: 'coustomer not found' });
        }
        res.json(coustomer);
    } catch (error) {
        console.error('Error finding coustomer:', error);
        res.status(500).json({ error: 'Error finding coustomer' });
    }
});
router.get('/coustomers', async (req, res) => {
    try {
        const coustomer = await Coustomer.find(req.params.id);    
        if (!coustomer) {
            return res.status(404).json({ error: 'coustomer not found' });
        }
        res.json(coustomer);
    } catch (error) {
        console.error('Error finding coustomer:', error);
        res.status(500).json({ error: 'Error finding coustomer' });
    }
});
router.patch('/coustomers/:id', async (req, res) => {
    try {
        const updatedcoustomer = await Coustomer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedcoustomer) {
            return res.status(404).json({ error: 'coustomer not found' });
        }
        res.json(updatedcoustomer);
    } catch (error) {
        console.error('Error updating coustomer:', error);
        res.status(500).json({ error: 'Error updating coustomer' });
    }
});



// Delete a coustomer
router.delete('/coustomers/:id', async (req, res) => {
    try {
        const deletedcoustomer = await Coustomer.findByIdAndDelete(req.params.id);
        if (!deletedcoustomer) {
            return res.status(404).json({ error: 'coustomer not found' });
        }
        res.json({ message: 'coustomer deleted successfully' });
    } catch (error) {
        console.error('Error deleting coustomer:', error);
        res.status(500).json({ error: 'Error deleting coustomer' });
    }
});



module.exports = router