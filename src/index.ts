//imports
import e from "express";
import  express  from "express";
import * as fs from "fs"




//initialising critical objects
const app = express();
const port = 3000;



//declaring functions
function createFile(name:string , content:any):boolean{
    fs.writeFile(__dirname + "/resources/" + name+ ".json" , content,err =>{
        if (err){
            console.log("Error");
            return false;
        }
    })
    console.log("Created " + name);
    return true;
}
function stringToJSON(name:string , age:string){
    return JSON.stringify([name , age]);
}

//creating routes and adding functionality
app.get("/test",(req,res)=>{
    res.send("This is a test")
})


//file upload
app.get("/upload/:name/:age", (req,res)=>{
    const data = stringToJSON(req.params.name , req.params.age);
    res.send(createFile(req.params.name,data) ? "Data entered" : "Entry Failed")
})

//file data-fetch
app.get("/fetch/:name" , (req,res)=>{
    const path = __dirname + "/resources/" + req.params.name + ".json"
    fs.readFile(path , "utf-8",(err,data)=>{
        if (err){
            console.error(err);
            res.status(500).send("<h1>ERROR</h1>")
            return
        }
        res.send(JSON.parse(data))
    })
})



app.listen(port , ()=>{
    console.log("Running server on port " + port);
})