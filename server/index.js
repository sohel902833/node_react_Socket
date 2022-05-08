const express=require("express");
const path=require("path")
const app=express();
const http=require("http")
const httpServer=http.Server(app)

const io=require("socket.io")(httpServer);
let i=0;


//create a namespace
const commentNamespace=io.of("/comment");
const likeNamespace=io.of("/like")

likeNamespace.emit()


io.on("connection",(socket)=>{
     console.log("New User Connected")
    
     //send data to client
      setInterval(() => {
          i++;
          socket.emit("takeData",i)
      }, 1000);

      //RECEIVE DATA FROM CLIENT
      socket.on("message",(msg)=>{
          console.log(msg)
      })

      //broadcast data to client
      setInterval(() => {
        i++;
        io.sockets.emit("MyBroadCast",i)

    }, 1000);


   



})



app.get("/",(req,res,next)=>{
    res.sendFile(path.resolve(__dirname,"index.html"))
})



httpServer.listen(4500,()=>{
    console.log(`Server Is Listening On Port 4500`)
})

