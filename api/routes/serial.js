const http = require('http');
const hostname = 'localhost';
const { SerialPort } = require('serialport')
const { ReadlineParser } = require('@serialport/parser-readline')
const { io } = require('socket.io');
let express = require('express')



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



// 1 st code for camera 

const express = require('express');
const http = require('http');
const SerialPort = require('serialport');
const WebSocket = require('ws');
const fs = require('fs');
const path = require('path');

const server = http.createServer(router);
const wss = new WebSocket.Server({ server });

const port = new SerialPort('/dev/tty-usbserial1', { baudRate: 9600 });

// WebSocket connection handling
wss.on('connection', (ws) => {
  console.log('Client connected');

  port.on('data', (data) => {
    ws.send(data); // Send serial port data to the WebSocket client
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);
  });
});

port.on('open', () => {
  console.log('Serial port opened');
  // Optionally, send a command to start the video stream
  port.write('START_STREAM_COMMAND'); // Replace with actual command
});

port.on('error', (err) => {
  console.error('Serial port error:', err);
});

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});






module.exports= router;


