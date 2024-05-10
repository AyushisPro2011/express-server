//imports
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
    const path = __dirname + "/resources/" + req.params.name +".json";
    
    
    fs.readFile(path , "utf-8",(err , data)=>{
        if (err){
            res.status(404).send("<h1>Not found</h1>")
        }
        res.send(data)
    } )
      
})

app.get("/update/:name/:age" , (req,res)=>{
    const data = stringToJSON(req.params.name , req.params.age);
    res.send(createFile(req.params.name,data) ? "Data Updated" : "Entry Failed")
})

app.get("/delete/:name" , (req,res)=>{
    const path = __dirname + "/resources/" + req.params.name + ".json"
    fs.unlink(path, (err)=>{
        if(err){
            res.status(500).send("<h1>File not deleted</h1>")
        }
        res.send("File deleted")
    })
})



app.listen(port , ()=>{
    console.log("Running server on port " + port);
})