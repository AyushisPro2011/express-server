async function getdata(address:string):Promise<string> {
    const response = await fetch(`${address}/`)
    const content = await response.text();
    return content;
}

console.log(getdata("http://localhost:3000/about").then(data=>{console.log(data)
}).catch(error => {console.log(error);
}))
