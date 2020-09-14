// server.js
var ip = require("ip");
import express from "express";
import path from "path";
import bodyParser from "body-parser";
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io").listen(server);
const PORT = 3000;
server.listen(PORT);
console.log("Server is running");

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
const connections = [];

io.sockets.on("connection", socket => {
  connections.push(socket);
  console.log(" %s sockets is connected", connections.length);

  socket.on("disconnect", () => {
    connections.splice(connections.indexOf(socket), 1);
  });
socket.on("sending message", message => {
  console.log("Message is received :", message);

  io.sockets.emit("new message", { message: message, ip:ip.address() });
});
});

console.log( ip.address() );
'use strict';

const { networkInterfaces } = require('os');

const nets = networkInterfaces();
const results = Object.create(null); // or just '{}', an empty object

for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
        // skip over non-ipv4 and internal (i.e. 127.0.0.1) addresses
        if (net.family === 'IPv4' && !net.internal) {
            if (!results[name]) {
                results[name] = [];
            }

            results[name].push(net.address);
        }
    }
}
