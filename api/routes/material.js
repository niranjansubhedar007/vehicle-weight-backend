const express = require('express');
const Material = require('../models/Material');

const router = express.Router()


router.post('/materials', async (req, res) => {
    try {
        const newmaterial = await Material.create(req.body);
        res.json(newmaterial);
    } catch (error) {
        console.error('Error creating material:', error);
        res.status(500).json({ error: 'Error creating material' });
    }
});

// Read a material by its attributes
router.get('/materials/:id', async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ error: 'material not found' });
        }
        res.json(material);
    } catch (error) {
        console.error('Error finding material:', error);
        res.status(500).json({ error: 'Error finding material' });
    }
});
router.get('/materials', async (req, res) => {
    try {
        const material = await Material.find(req.params.id);    
        if (!material) {
            return res.status(404).json({ error: 'material not found' });
        }
        res.json(material);
    } catch (error) {
        console.error('Error finding material:', error);
        res.status(500).json({ error: 'Error finding material' });
    }
});
router.get('/materials/checked', async (req, res) => {
    try {
        const checkedMaterials = await Material.find({ isChecked: true });
        res.json(checkedMaterials);
    } catch (error) {
        console.error('Error fetching checked materials:', error);
        res.status(500).json({ error: 'Error fetching checked materials' });
    }
});

router.patch('/materials/:id', async (req, res) => {
    try {
        const updatedmaterial = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedmaterial) {
            return res.status(404).json({ error: 'material not found' });
        }
        res.json(updatedmaterial);
    } catch (error) {
        console.error('Error updating material:', error);
        res.status(500).json({ error: 'Error updating material' });
    }
});



// Delete a material
router.delete('/materials/:id', async (req, res) => {
    try {
        const deletedmaterial = await Material.findByIdAndDelete(req.params.id);
        if (!deletedmaterial) {
            return res.status(404).json({ error: 'material not found' });
        }
        res.json({ message: 'material deleted successfully' });
    } catch (error) {
        console.error('Error deleting material:', error);
        res.status(500).json({ error: 'Error deleting material' });
    }
});



module.exports = router