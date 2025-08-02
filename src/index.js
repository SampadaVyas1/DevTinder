const express=require("express");
const app=express();

//hahahahaha
app.use("/user",(req,res)=>{
    res.send("hahahahaha")
})
//This will only handle GET call to /user
app.get("/user",(req,res)=>{
res.send({name:"smapada"})
})
app.post("/user",(req,res)=>{
    res.send("Data saves SuccessFully")
})
//this will match all the HTTP method API calla to /test
app.use("/test",(req,res)=>{
res.send("Hello from the server");
})

app.use("/",(req,res)=>{
    res.send("Hello from the dashnpard")
})
app.listen(7777,()=>{
    console.log("Server is Suvvessfully listeming at 7777")
}) 