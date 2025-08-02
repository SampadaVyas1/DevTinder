const express=require("express");
const app=express();
// app.use("/",(req,res)=>{
//     res.send("Hello from the dashnpard")
// })

app.use("/hello",(req,res)=>{
    res.send("Hello  Hello Hello");
})
app.use("/hello/2",(req,res)=>{
    res.send("AbQARkAdABRAS")
})
app.use("/test",(req,res)=>{
res.send("Hello from the server");
})

app.use("/",(req,res)=>{
    res.send("Hello from the dashnpard")
})
app.listen(7777,()=>{
    console.log("Server is Suvvessfully listeming at 7777")
}) 