const url = "http://localhost:8888/visipark/";

export async function Fetch(filename, data, conslog){
    var resp = null;
    if(data==null){
        // GET
        resp = await fetch(url+filename+".php")
    } else {
        // POST
        resp = await fetch(url+filename+".php",{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify(data)
        }) 
        }
    var json = await resp.json();
    if(conslog !== null){
        console.log(conslog,json);
    }
    return json;
}

export default Fetch;