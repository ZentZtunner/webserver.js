const { prototype } = require('events');
var express = require('express');
const net = require('net');
const fs= require('fs');
const path = require('path/posix');
const app=express();
app.use(express.static(__dirname));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname,'Home.html'));
  });


const webserver = net.createServer ((socket)=>{
    socket.on("data",(buffer)=>{
        const requestString = buffer.toString('utf-8')
        var request = parseRequest(requestString)
        console.log(request);
        if(request.method=="GET" && request.path=="/" ){
            socket.write("HTTP/1.1 200 OK\r\n\r\n\r\n");
            socket.send(__dirname, '/teste.html');
            socket.end();
        }
        else{
            socket.write("HTTP/1.1 404 Not Found\r\n\r\n\r\n");
            socket.end();
        }
    })
})
const parseRequest=(requestString)=>{
    const [method, path, proctocol]=requestString.split(' ');
    return{
        method,
        path,
        proctocol
    }  
}


 app.listen(process.env.PORT || 9999,()=>console.log("listening in localhost 9999..."))
