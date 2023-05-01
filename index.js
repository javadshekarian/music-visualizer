const fs=require('fs');
const path=require('path');

const express=require('express');
const bodyParser=require('body-parser');
const upload=require('express-fileupload');
const uuid=require('uuid').v4;

const app=express()

app.use(express.static(path.join(__dirname,"public")))
app.use(bodyParser.urlencoded({extended:false}))
app.use(upload())

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public","index.html"))
})

app.listen(3000,()=>{
    console.log("the app is listen to port 3000!")
})