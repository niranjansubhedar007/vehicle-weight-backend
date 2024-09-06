


const http = require('http');
const hostname = 'localhost';
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const { io } = require('socket.io');
let express = require('express')
const { Router } = require('express')


const router = express.Router()

const serialPort = new SerialPort({ 
    path: 'COM1',
    baudRate: 2400 ,
})
const parser = serialPort.pipe(new ReadlineParser({ delimiter: '\r\n' }))



let latestWeightData = '';

// Listen for data events from the serial port
parser.on('data', data => {
    // Update the latest weight data whenever new data is received
    latestWeightData = data;
    //latestWeightData = data;
});

// Define a route to fetch the latest weight data
router.get('/get_data', (req, res) => {

    const weightData = latestWeightData.replace(/^\x02|\x03$/g, '').trim();


    // Return the latest weight data as a JSON response
    res.json({ weight: weightData  });
});




module.exports= router;


