let express=require("express");
let app=express();
app.use(express.json());
app.use(function(req,res,next){
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS,PUT,PATCH,DELETE,HEAD");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    next();
})
var port=process.env.PORT||2410;
app.listen(port,()=>console.log(`Listening on port ${port}!`));

let {customerData}=require("./customerData");
app.get("/customers",function(req,res){
    // gender=Female&sortBy=age&payment=Credit%20Card&city=Noida
    let gender=req.query.gender;
    let sortBy=req.query.sortBy;
    let payment=req.query.payment;
    let city=req.query.city;
    let arr1=customerData;
    if(gender) arr1=arr1.filter((c)=>c.gender===gender);
    if(sortBy==="age") arr1=arr1.sort((c1,c2)=>+c1.age-(+c2.age));
    if(sortBy==="city") arr1=arr1.sort((c1,c2)=>c1.city.localeCompare(c2.city));
    if(payment) arr1=arr1.filter((c)=>c.payment===payment);
    if(city) arr1=arr1.filter((c)=>c.city===city);
    res.send(arr1);
})
app.get("/customers/:id",function(req,res){
    let id=req.params.id;
    let obj=customerData.find((c)=>c.id===id);
    if(obj) res.send(obj);
    else res.status(404).send("Customer Not Found");
})
app.post("/customers",function(req,res){
    let customer=req.body;
    let updatedData={...customer};
    customerData.push(updatedData)
    res.send(updatedData);
})
app.put("/customers/:id",function(req,res){
    let id=req.params.id;
    let body=req.body;
    let index=customerData.findIndex((c)=>c.id===id);
    let updatedData={...body}
    if(index>=0){
        customerData[index]=updatedData;
        res.send(updatedData);
    }
    else res.status(404).send("Customer Not Found")
})
app.delete("/customer/:id",function(req,res){
    let id=req.params.id;
    console.log(id)
    let index=customerData.findIndex((c)=>c.id===id);
    if(index>=0){

    let deletedData=customerData.splice(index,1);
        console.log(deletedData);
        res.send(deletedData)
    }
    else res.status(404).send("Customer Not Found")
})