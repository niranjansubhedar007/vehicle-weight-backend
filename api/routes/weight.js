const express = require('express');
const router = express.Router();
const Weight = require('../models/Weight');
const Vehical = require('../models/Vehical');
const Material = require('../models/Material');

// Function to update isChecked field in Weight collection based on selectedMaterialName
const updateIsChecked = async (selectedMaterialName) => {
    try {
        // Find the corresponding material in the Material collection
        const material = await Material.findOne({ materialName: selectedMaterialName });
        if (!material) {
            throw new Error('Material not found');
        }
        // Update the isChecked field in the Weight collection based on the material's isChecked value
        await Weight.updateMany({ selectedMaterialName }, { isChecked: material.isChecked });
    } catch (error) {
        console.error('Error updating isChecked field in Weight collection:', error);
    }
};


router.post('/weights', async (req, res) => {
    try {
        const { RSTNo,ewayNo, grossWeight, tareWeight, netWeight, selectedVehicleRTONo, selectedMaterialName } = req.body;

        // Fetch vehicle details
        const selectedVehicle = await Vehical.findOne({ vehicalRTONo: selectedVehicleRTONo });
        if (!selectedVehicle) {
            return res.status(404).json({ error: 'Selected vehicle not found' });
        }

        // Create a new weight entry
        const newWeight = new Weight({
            RSTNo,
            grossWeight,
            tareWeight,
            netWeight,
            selectedVehicleRTONo,
            selectedMaterialName,
            vehicalOwnerName: selectedVehicle.vehicalOwnerName,
            vehicalMobileNo: selectedVehicle.mobileNo,
            vehicalAddress: selectedVehicle.address,
            ewayNo
        });

        // Save the new weight entry
        const savedWeight = await newWeight.save();

        // Update isChecked field based on selectedMaterialName
        await updateIsChecked(selectedMaterialName);

        res.status(201).json(savedWeight);
    } catch (error) {
        console.error('Error creating weight:', error);
        res.status(500).json({ error: 'Error creating weight' });
    }
});





router.patch('/weights/:id', getWeight, async (req, res) => {
    try {
        const updatedWeight = res.weight;
        // Update fields based on request body
        if (req.body.grossWeight != null) {
            updatedWeight.grossWeight = req.body.grossWeight;
        }
        if (req.body.tareWeight != null) {
            updatedWeight.tareWeight = req.body.tareWeight;
        }
        if (req.body.ewayNo != null) {
            updatedWeight.ewayNo = req.body.ewayNo;
        }
        if (req.body.netWeight != null) {
            updatedWeight.netWeight = req.body.netWeight;
            // Set isTemporary to true if netWeight is not null
            updatedWeight.isTemporary = true;
        }
        if (req.body.selectedMaterialName != null) {
            updatedWeight.selectedMaterialName = req.body.selectedMaterialName;
            // Update isChecked field based on updated selectedMaterialName
            await updateIsChecked(req.body.selectedMaterialName);
        }
        // Save the updated weight entry
        const savedWeight = await updatedWeight.save();
        res.json(savedWeight);
    } catch (error) {
        console.error('Error updating weight:', error);
        res.status(400).json({ error: 'Error updating weight' });
    }
});




router.get('/weights/checked', async (req, res) => {
    try {
        // Find weights where selectedMaterialName matches the materialName with isChecked true
        const weightsWithCheckedMaterials = await Weight.find({ isChecked: true });
        
        res.json(weightsWithCheckedMaterials);
    } catch (error) {
        console.error('Error fetching weights with checked materials:', error);
        res.status(500).json({ error: 'Error fetching weights with checked materials' });
    }
});

// Get weights with checked materials
router.get('/weights/unchecked', async (req, res) => {
    try {
        // Find weights where selectedMaterialName matches the materialName with isChecked true
        const weightsWithCheckedMaterials = await Weight.find({ isChecked: false });
        
        res.json(weightsWithCheckedMaterials);
    } catch (error) {
        console.error('Error fetching weights with checked materials:', error);
        res.status(500).json({ error: 'Error fetching weights with checked materials' });
    }
});

router.get('/weight/getNextRSTNo', async (req, res) => {
    try {
        // Find the maximum RSTNo from existing weight entries
        const maxRSTNo = await Weight.findOne().sort({ RSTNo: -1 }).select('RSTNo');
        let nextRSTNo = 1;
        if (maxRSTNo) {
            nextRSTNo = maxRSTNo.RSTNo + 1;
        }
        res.json({ nextRSTNo });
    } catch (error) {
        console.error('Error fetching next RSTNo:', error);
        res.status(500).json({ error: 'Error fetching next RSTNo' });
    }
});

// Get all weight entries
router.get('/weights', async (req, res) => {
    try {
        const weights = await Weight.find();
        res.json(weights);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// routes/weights.js




// Delete a weight entry
router.delete('/weights/:id', getWeight, async (req, res) => {
    try {
        await res.weight.remove();
        res.json({ message: 'Weight deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware to get weight by ID
async function getWeight(req, res, next) {
    let weight;
    try {
        weight = await Weight.findById(req.params.id);
        if (weight == null) {
            return res.status(404).json({ message: 'Weight not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.weight = weight;
    next();
}

router.get('/RSTNumber/:RSTNumber', async (req, res) => {
    try {
      const { RSTNumber } = req.params;
  
      // Find the weight by order number
      const weight = await Weight.findOne({ RSTNumber });
  
      if (!weight) {
        return res.status(404).json({ message: "RSTNumber not found" });
      }
  
      res.status(200).json(weight);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
module.exports = router;
