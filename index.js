// create an instance of express application.
var express = require('express')
const app = express();

//get the server by reuiring the built-in node module http.
//Then call .createServer and pass in the application
const server = require("http").createServer(app);

//import cross origin requests which is the middleware package.
//would be used once we deploy our application
const cors = require("cors");

//pass two parameters, 1st is the server and second is the 
//options object inside which we set the origin as '*'
//and methods an array of two strings "GET" and "POST".
const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

//use cors and call it as a function
app.use(cors());

//set PORT to whatever is in the environment variable or 3000 if there's nothing
//in heroku, we can set the environment variable PORT to tell the web server which port to listen to
const PORT = process.env.PORT || 5000;

//create end-points. Here we are accepting a get request at
//the index row / and we have a callback function which takes 
//in a request and response. 
app.get("/", (req, res) =>{
    res.send('Server is running.');
});

//Listen for the 'on' event. If it happens, perform a 
//function(callback) which provides the socket used for real-time
//data transmission ie. messages, audio or video.  
io.on('connection', (socket) =>{

    //send id from server side to the frontend
    socket.emit('me', socket.id);

    //if client-side disconnects, broadcast call ended 
    socket.on('disconnect', ()=>{
        socket.broadcast.emit("call ended");
    });

    //Once this handler is reached, destructure the data which will
    //be passed from the front-end. userToCall contains id
    socket.on("calluser", ({userToCall, signalData, from, name}) => {
        io.to(userToCall).emit("calluser", {signal: signalData, from, name});
    })

    socket.on("answercall", (data) =>{
        io.to(data.to).emit("callaccepted", data.signal);
    })

});

//`` are a template string which enable string interpolation
server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
