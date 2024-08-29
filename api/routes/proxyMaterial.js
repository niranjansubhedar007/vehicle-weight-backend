const express = require('express');
const ProxyMaterial = require('../models/ProxyMaterial');
 

const router = express.Router()


router.post('/proxyMaterials', async (req, res) => {
    try {
        const newmaterial = await ProxyMaterial.create(req.body);
        res.json(newmaterial);
    } catch (error) {
        console.error('Error creating material:', error);
        res.status(500).json({ error: 'Error creating material' });
    }
});

// Read a material by its attributes
router.get('/proxyMaterials/:id', async (req, res) => {
    try {
        const material = await ProxyMaterial.findById(req.params.id);
        if (!material) {
            return res.status(404).json({ error: 'material not found' });
        }
        res.json(material);
    } catch (error) {
        console.error('Error finding material:', error);
        res.status(500).json({ error: 'Error finding material' });
    }
});
router.get('/proxyMaterials', async (req, res) => {
    try {
        const material = await ProxyMaterial.find(req.params.id);    
        if (!material) {
            return res.status(404).json({ error: 'material not found' });
        }
        res.json(material);
    } catch (error) {
        console.error('Error finding material:', error);
        res.status(500).json({ error: 'Error finding material' });
    }
});


router.patch('/proxyMaterials/:id', async (req, res) => {
    try {
        const updatedmaterial = await ProxyMaterial.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
router.delete('/proxyMaterials/:id', async (req, res) => {
    try {
        const deletedmaterial = await ProxyMaterial.findByIdAndDelete(req.params.id);
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